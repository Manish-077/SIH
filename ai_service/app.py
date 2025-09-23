from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

# Initialize app
app = Flask(__name__)
CORS(app)

# Load models and encoders
try:
    yield_model = joblib.load("model/yield_model.pkl")
    soil_encoder = joblib.load("model/soil_encoder.pkl")
    crop_encoder = joblib.load("model/crop_encoder.pkl") # Load crop encoder
except Exception as e:
    print(f"Model loading error: {e}")
    yield_model = None
    soil_encoder = None
    crop_encoder = None

@app.route("/")
def home():
    return jsonify({"message": "Unified Crop Yield Prediction API is running 🚀"})

@app.route("/predict", methods=["POST"])
def predict():
    if not yield_model or not soil_encoder or not crop_encoder:
        return jsonify({"error": "AI models not loaded. Please check server logs."}), 500

    try:
        data = request.get_json()
        N = float(data.get("N"))
        P = float(data.get("P"))
        K = float(data.get("K"))
        temperature = float(data.get("temperature"))
        humidity = float(data.get("humidity"))
        ph = float(data.get("ph"))
        rainfall = float(data.get("rainfall"))
        crop = data.get("crop")
        soil_type = data.get("soil_type")
        fertilizer = float(data.get("fertilizer"))

        # Encode categorical features
        soil_encoded = soil_encoder.transform(np.array([soil_type]).reshape(-1, 1))[0][0]
        crop_encoded = crop_encoder.transform(np.array([crop]).reshape(-1, 1))[0][0]

        # Prepare features for the model
        # Ensure the order of features matches the model's training data
        features = np.array([[N, P, K, temperature, humidity, ph, rainfall, soil_encoded, crop_encoded, fertilizer]])
        
        predicted_yield = yield_model.predict(features)[0]

        return jsonify({"prediction": round(predicted_yield, 2)})

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 400

@app.route("/retrain", methods=["POST"])
def retrain():
    if not yield_model or not soil_encoder or not crop_encoder:
        return jsonify({"error": "AI models not loaded. Cannot retrain."}), 500

    try:
        # Expecting CSV data in the request body
        csv_data = request.data.decode('utf-8')
        df = pd.read_csv(io.StringIO(csv_data))

        # Assuming the CSV has columns: N, P, K, temperature, humidity, ph, rainfall, soil_type, crop, fertilizer, yield
        # Preprocessing steps (similar to initial training)
        X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall', 'soil_type', 'crop', 'fertilizer']]
        y = df['yield']

        # Re-encode categorical features with potentially new categories
        soil_encoder.fit(X[['soil_type']])
        crop_encoder.fit(X[['crop']])

        X['soil_type_encoded'] = soil_encoder.transform(X[['soil_type']])
        X['crop_encoded'] = crop_encoder.transform(X[['crop']])

        X_processed = X.drop(columns=['soil_type', 'crop'])

        # Retrain the model
        yield_model.fit(X_processed, y)

        # Save updated models and encoders
        joblib.dump(yield_model, "model/yield_model.pkl")
        joblib.dump(soil_encoder, "model/soil_encoder.pkl")
        joblib.dump(crop_encoder, "model/crop_encoder.pkl")

        return jsonify({"message": "Model retrained successfully!"}), 200

    except Exception as e:
        print(f"Retraining error: {e}")
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)