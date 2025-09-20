import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib

# Load dataset
data = pd.read_csv("data/sample_dataset.csv")

# Encode categorical column Soil_Type
soil_encoder = LabelEncoder()
data["Soil_Type"] = soil_encoder.fit_transform(data["Soil_Type"])

# Encode Crop column (optional, useful if we expand dataset)
crop_encoder = LabelEncoder()
data["Crop"] = crop_encoder.fit_transform(data["Crop"])

# Features and Target
X = data[["Soil_Type", "Rainfall_mm", "Temperature_C", "Fertilizer_Used_kg_per_acre"]]
y = data["Yield_quintals_per_acre"]

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model & encoders
joblib.dump(model, "model/yield_model.pkl")
joblib.dump(soil_encoder, "model/soil_encoder.pkl")
joblib.dump(crop_encoder, "model/crop_encoder.pkl")

print("✅ Model trained and saved as yield_model.pkl")
