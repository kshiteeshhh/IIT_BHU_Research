import joblib
import pandas as pd
from sklearn.preprocessing import normalize
from CBFV import composition  
import sys
import os

def predict_material_properties(user_formula, model_ehull, scaler_ehull, model_hform, scaler_hform):
    df_input = pd.DataFrame({'formula': [user_formula], 'target': [0]})

    try:
        # Generate features for Ehull
        X_unscaled_ehull, _, _, _ = composition.generate_features(
            df_input,
            elem_prop='magpie',
            drop_duplicates=False,
            extend_features=True,
            sum_feat=True
        )
        # Scale and normalize Ehull features
        X_scaled_ehull = scaler_ehull.transform(X_unscaled_ehull)
        X_normalized_ehull = normalize(X_scaled_ehull)
        predicted_ehull = model_ehull.predict(X_normalized_ehull)[0]
    except Exception as e:
        print(f"An error occurred during Ehull processing: {e}")
        return

    try:
        # Generate features for Hform
        X_unscaled_hform, _, _, _ = composition.generate_features(
            df_input,
            elem_prop='magpie',
            drop_duplicates=False,
            extend_features=True,
            sum_feat=True
        )
        # Scale and normalize Hform features
        X_scaled_hform = scaler_hform.transform(X_unscaled_hform)
        X_normalized_hform = normalize(X_scaled_hform)
        predicted_hform = model_hform.predict(X_normalized_hform)[0]
    except Exception as e:
        print(f"An error occurred during Hform processing: {e}")
        return

    # Determine stability level based on predicted values
    try:
        if predicted_hform > 0:
            stability_level = 1  # Low stability
        elif predicted_ehull > 0.2:
            stability_level = 2  # Medium stability
        else:
            stability_level = 3  # High stability
    except Exception as e:
        print(f"An error occurred while determining stability level: {e}")
        return

    print(f"Predicted Ehull for {user_formula}: {predicted_ehull}")
    print(f"Predicted Hform for {user_formula}: {predicted_hform}")
    print(f"Predicted Stability Level for {user_formula}: {stability_level}")

def main():
    user_formula = "Cd2I2" #sys.argv[1]

    # Define the directory where the models are stored
    model_dir = os.path.dirname(os.path.abspath(__file__))

    # Load the scalers and models with absolute paths
    scaler_ehull = joblib.load(os.path.join(model_dir, 'scaler_ehull.pkl'))
    scaler_hform = joblib.load(os.path.join(model_dir, 'scaler_hform.pkl'))
    model_ehull = joblib.load(os.path.join(model_dir, 'best_model.pkl'))
    model_hform = joblib.load(os.path.join(model_dir, 'best_model_hform.pkl'))

    # Predict material properties
    predict_material_properties(user_formula, model_ehull, scaler_ehull, model_hform, scaler_hform)

if __name__ == "__main__":
    main()
