from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import joblib
import numpy as np

# Initialize app
app = Flask(__name__)
CORS(app)

# Load models and encoders
try:
    crop_encoder = pickle.load(open("model/crop_encoder.pkl", "rb"))
    soil_encoder_basic = pickle.load(open("model/soil_encoder.pkl", "rb"))
    yield_model_basic = pickle.load(open("model/yield_model.pkl", "rb"))

    yield_model_advanced = joblib.load("model/yield_model.pkl")  # same name, different logic
    soil_encoder_advanced = joblib.load("model/soil_encoder.pkl")
except Exception as e:
    print(f"Model loading error: {e}")

@app.route("/")
def home():
    return jsonify({"message": "Unified Crop Yield Prediction API is running 🚀"})

@app.route("/predict_basic", methods=["POST"])
def predict_basic():
    try:
        data = request.get_json()
        crop = crop_encoder.transform([data["crop"]])[0]
        soil = soil_encoder_basic.transform([data["soil"]])[0]
        area = float(data["area"])

        prediction = yield_model_basic.predict([[crop, soil, area]])
        return jsonify({"predicted_yield": float(prediction[0])})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/predict_advanced", methods=["POST"])
def predict_advanced():
    try:
        data = request.get_json()
        soil_type = data["Soil_Type"]
        rainfall = float(data["Rainfall_mm"])
        temperature = float(data["Temperature_C"])
        fertilizer = float(data["Fertilizer_Used_kg_per_acre"])

        soil_encoded = soil_encoder_advanced.transform([soil_type])[0]
        features = np.array([[soil_encoded, rainfall, temperature, fertilizer]])
        predicted_yield = yield_model_advanced.predict(features)[0]

        return jsonify({
            "Soil_Type": soil_type,
            "Rainfall_mm": rainfall,
            "Temperature_C": temperature,
            "Fertilizer_Used_kg_per_acre": fertilizer,
            "Predicted_Yield": round(predicted_yield, 2)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)