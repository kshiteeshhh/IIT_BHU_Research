from django.urls import path
from .views import UserCreateView, LoginView
from . import views
from .views import send_contact_email

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', views.index, name='index'), 
    path('predict/thermodynamicStability/', views.predict_thermodynamicStability, name='predict_thermodynamicStability'),
    path('predict/metal_nonMetal/', views.predict_metalNonMetal, name='predict_metalNonMetal'),
    path('predict/bandGap/',views.predict_bandGap,name='predict_bandGap'),
     path('send-email/', send_contact_email, name='send-email')
]


