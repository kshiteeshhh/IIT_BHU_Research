import joblib
import pandas as pd
from CBFV import composition  # Ensure this is the correct import for your feature generation
import sys
import os

def predict_material_properties(user_formula, model_ehull, model_hform):
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
       
        predicted_ehull = model_ehull.predict(X_unscaled_ehull)[0]
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
        
        predicted_hform = model_hform.predict(X_unscaled_hform)[0]
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
   # if len(sys.argv) != 2:
    #    print("Usage: python deploy_model.py <user_formula>")
     #   return

    user_formula = sys.argv[1] 
    model_dir = os.path.dirname(os.path.abspath(__file__))

    # model_ehull = joblib.load('best_model.pkl')
    # model_hform = joblib.load('best_model_hform.pkl')
    
    model_ehull = joblib.load(os.path.join(model_dir, 'best_model.pkl'))
    model_hform = joblib.load(os.path.join(model_dir, 'best_model_hform.pkl'))

    # Predict material properties
    predict_material_properties(user_formula, model_ehull, model_hform)

if __name__ == "__main__":
    main()