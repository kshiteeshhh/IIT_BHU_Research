import pickle
import pandas as pd
from CBFV import composition
from sklearn.preprocessing import normalize
import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'model_info.pkl')

with open(model_path, 'rb') as file:
    loaded_model_info = pickle.load(file)


model_loaded = loaded_model_info["model"]
scaler_loaded = loaded_model_info["scaler"]
performance_mse_loaded = loaded_model_info["performance_mse"]
performance_r2_loaded = loaded_model_info["performance_r2"]
description_loaded = loaded_model_info["description"]


def predict_single_compound(model, compound, scaler):
    """
    Function to predict band gap for a single compound.
    """

    predicting_data = pd.DataFrame({'formula': [compound]})
    predicting_data['target'] = 0

    features, _, _, _ = composition.generate_features(
        predicting_data, elem_prop='magpie', drop_duplicates=False, extend_features=True, sum_feat=True)

    if 'target' in features.columns:
        features = features.drop(columns=['target'])

    features_scaled = scaler.transform(features)
    features_normalized = normalize(features_scaled)

    prediction = model.predict(features_normalized)
    
    return prediction[0]

if __name__ == "__main__":

    compound = sys.argv[1]
    

    prediction = predict_single_compound(model_loaded, compound, scaler_loaded)

    print(prediction)
