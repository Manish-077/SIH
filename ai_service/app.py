from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import numpy as np

app = Flask(__name__)
CORS(app)

# Get the absolute path to the directory containing this script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Load models
model_dir = os.path.join(script_dir, 'model')
yield_model = joblib.load(os.path.join(model_dir, 'yield_model.pkl'))
soil_encoder = joblib.load(os.path.join(model_dir, 'soil_encoder.pkl'))
crop_encoder = joblib.load(os.path.join(model_dir, 'crop_encoder.pkl'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # Transform categorical features
    soil_type_encoded = soil_encoder.transform([data['soil_type']])[0]
    crop_encoded = crop_encoder.transform([data['crop']])[0]

    # Create the feature list in the correct order
    features = [
        soil_type_encoded,
        data['rainfall'],
        data['temperature'],
        data['fertilizer'],
        crop_encoded,
        data['humidity']  # This is Water_Availability
    ]

    # The model expects a 2D array
    features_array = np.array([features])

    prediction = yield_model.predict(features_array)[0]
    return jsonify({'prediction': prediction})

# Optional: retrain endpoint for dataset upload
@app.route('/retrain', methods=['POST'])
def retrain():
    # Implement retraining logic here
    return jsonify({'status': 'retrained'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)