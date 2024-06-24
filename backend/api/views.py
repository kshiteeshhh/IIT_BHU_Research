from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import subprocess
import os
import re
import sys

User = get_user_model()

class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

@csrf_exempt
def predict_bandGap(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_formula = data['user_formula']

            current_dir = os.path.dirname(os.path.abspath(__file__))
            script_path = os.path.join(current_dir, 'models/bandGap', 'script.py')

            result = subprocess.run([sys.executable, script_path, user_formula], capture_output=True, text=True)

            if result.returncode != 0:
                return JsonResponse({'error': result.stderr}, status=400)

            output = result.stdout.strip()
            value = re.findall(r"\d+\.\d+", output)
            return JsonResponse({'predictedBandGap': value})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def predict_thermodynamicStability(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_formula = data['user_formula']
            current_dir = os.path.dirname(os.path.abspath(__file__))
            script_path = os.path.join(current_dir, 'models/thermodynamicStability', 'script.py')

            result = subprocess.run([sys.executable, script_path, user_formula], capture_output=True, text=True)

            if result.returncode != 0:
                return JsonResponse({'error': result.stderr}, status=400)

            output = result.stdout.strip()
            match = re.search(r"Predicted Stability Level for .+: (\d+)", output)
            if match:
                stability_level = match.group(1)
                return JsonResponse({'stability_level': stability_level})
            else:
                return JsonResponse({'error': 'Stability level not found in the output'}, status=400)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def predict_metalNonMetal(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_formula = data['user_formula']

            current_dir = os.path.dirname(os.path.abspath(__file__))
            script_path = os.path.join(current_dir, 'models/metallic_nonMetallic', 'script.py')

            result = subprocess.run([sys.executable, script_path, user_formula], capture_output=True, text=True)

            if result.returncode != 0:
                return JsonResponse({'error': result.stderr}, status=400)

            output = result.stdout.split('is: ')[1].strip()
            return JsonResponse({'metallicNature': output})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
