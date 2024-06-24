import pickle
import pandas as pd
from CBFV import composition
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import normalize
import sys
import os

def predict_metal(formula, model, scaler):
    # Generate features for the formula
    input = pd.DataFrame({'formula': [formula], 'target': [0]})
    features, _, _, _ = composition.generate_features(input, elem_prop='magpie', drop_duplicates=False, extend_features=True, sum_feat=True)

    # Scale and normalize the features
    features_scaled = scaler.transform(features)
    features_normalized = normalize(features_scaled)

    # Predict using the classifier
    prediction = model.predict(features_normalized)
    # Map the prediction to the corresponding label
    prediction_label = 'Metal' if prediction[0] == 1 else 'Non-Metal'
    return prediction_label

def main():
    formula_input = sys.argv[1]
    
    # Get the directory where this script is located
    model_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Correctly assemble the path to the model file
    # The correct path is directly under the metallic_nonMetallic directory
    model_path = os.path.join(model_dir, 'model.pkl')
    
    # Load the model and scaler from the correct path
    with open(model_path, 'rb') as file:
        loaded_model_info = pickle.load(file)

    # Access the model and scaler
    model_loaded = loaded_model_info["model"]
    scaler_loaded = loaded_model_info["scaler"]

    # Run the prediction function
    prediction_result = predict_metal(formula_input, model_loaded, scaler_loaded)
    print("Prediction for Formula", formula_input, "is:", prediction_result)

if __name__ == "__main__":
    main()
