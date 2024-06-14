from django.apps import AppConfig
import os
import joblib

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # Load the model when the app is ready
        model_path = os.path.join(self.path, 'models', 'best_model_hform.pkl')
        self.model = joblib.load(model_path)

# Register the app config
default_app_config = 'api.apps.ApiConfig'
