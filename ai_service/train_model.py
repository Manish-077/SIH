import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import joblib
import os

# Get the absolute path to the directory containing this script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the data file
data_path = os.path.join(script_dir, 'data', 'sample_dataset.csv')
# Load dataset
data = pd.read_csv(data_path)

# Encode categorical column Soil_Type
soil_encoder = LabelEncoder()
data["Soil_Type"] = soil_encoder.fit_transform(data["Soil_Type"])

# Encode Crop column (optional, useful if we expand dataset)
crop_encoder = LabelEncoder()
data["Crop"] = crop_encoder.fit_transform(data["Crop"])

# Features and Target
X = data[["Soil_Type", "Rainfall", "Temperature", "Fertilizer_Usage", "Crop", "Water_Availability"]]
y = data["Yield"]

# Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model & encoders
model_dir = os.path.join(script_dir, 'model')
os.makedirs(model_dir, exist_ok=True)
joblib.dump(model, os.path.join(model_dir, "yield_model.pkl"))
joblib.dump(soil_encoder, os.path.join(model_dir, "soil_encoder.pkl"))
joblib.dump(crop_encoder, os.path.join(model_dir, "crop_encoder.pkl"))


print("Model trained and saved as yield_model.pkl")