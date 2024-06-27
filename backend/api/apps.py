from django.apps import AppConfig
import os
import joblib

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    _models = {}  # Dictionary to store loaded models

    def get_model(self, model_key):
        # Check if the model is already loaded
        if model_key not in self._models:
            # Define the path to the model file
            model_paths = {
                'hform': os.path.join(self.path, 'models/thermodynamicStability', 'best_model_hform.pkl'),
                'metal_nonmetal': os.path.join(self.path, 'models/metallic_nonMetallic', 'model.pkl'),
                'bandGap':os.path.join(self.path,'models/bandGap','model_info.pkl')
            }
            model_path = model_paths.get(model_key)
            if model_path is None:
                raise ValueError(f"No model path found for key: {model_key}")

            # Load the model
            try:
                self._models[model_key] = joblib.load(model_path)
            except Exception as e:
                print(f"Failed to load model {model_key}: {e}")
                raise

        return self._models[model_key]

    def ready(self):
        pass
