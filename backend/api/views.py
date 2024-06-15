from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.http import JsonResponse
from django.apps import apps
import json
from django.views.decorators.csrf import csrf_exempt
# from .models.script import predict_material_properties 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import subprocess
import os
import sys

User = get_user_model()

# class UserCreateView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
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
def predict(request):
    if request.method == 'POST':
        try:
            # Get the directory of the current file
            current_dir = os.path.dirname(os.path.abspath(__file__))
            
            # Define the path to script.py
            script_path = os.path.join(current_dir, 'models', 'script.py')
            
            # Run script.py using subprocess
            result = subprocess.run([sys.executable, script_path], capture_output=True, text=True)
            
            # Check for errors
            if result.returncode != 0:
                return JsonResponse({'error': result.stderr}, status=400)
            
            # Parse the output
            output = result.stdout.strip()
            return JsonResponse({'output': output})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)