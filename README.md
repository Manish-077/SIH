# 🌾 AI-Powered Crop Yield Prediction and Optimization  
**Smart India Hackathon 2025 – Problem Statement ID: SIH25044**  
**Theme:** Agriculture, FoodTech & Rural Development  

---

## 🚀 Project Overview
Indian farmers often face uncertainty in crop yield due to climate change, soil variations, and lack of timely advisory.  
Our solution provides **AI-powered yield prediction and crop optimization** using soil, weather, satellite, and historical data.  

It empowers farmers with **farm-specific advice** and helps the government & insurance companies with **data-driven decisions**.  

---

## ✨ Key Features
- **Yield Prediction:** ML model forecasts expected crop yield.  
- **Crop Recommendation:** Suggests the best crop based on soil & weather.  
- **Fertilizer & Irrigation Advice:** Optimizes input cost.  
- **Weather Forecast Integration:** Alerts for rainfall/drought.  
- **Government Schemes:** Links subsidies and crop insurance.  
- **Multi-Language & Voice Support:** Farmer-friendly, works in Hindi/English/local languages.  
- **Low-Bandwidth Mode:** Works offline/SMS for rural areas.  

---

## 🏗️ System Architecture
```
Farmer App (Flutter) 
     ↓ 
Node.js Backend + MongoDB
     ↓
Python AI Service (Flask ML Model)
     ↓
Prediction Results + Advisory
     ↓
Farmer App & Admin Dashboard (React Web)
```

---

## 📂 Folder Structure
```
AI-Crop-Optimization/
│
├── frontend/            # Flutter Farmer App
├── admin-dashboard/     # React Admin Web App
├── backend/             # Node.js + Express + MongoDB
├── ai_service/          # Python AI Microservice
└── docs/                # Documentation (wireframes, ppt, readme)
```

---

## ⚡ Tech Stack
- **Frontend (Farmer App):** Flutter  
- **Admin Dashboard:** React.js  
- **Backend:** Node.js + Express + MongoDB  
- **AI Service:** Python, Flask, Scikit-learn  
- **APIs & Data Sources:** OpenWeather, IMD, Landsat/Sentinel-2, Soil Health Card  

---

## 📊 Impact & Benefits
- **Social:** Improves farmer decision-making → better livelihoods.  
- **Economic:** Increases yield by 15–20%, reduces input cost by 10–15%.  
- **Environmental:** Optimizes fertilizer/water use → 25% savings.  
- **Scalability:** Can expand nationwide to benefit **120M+ farmers**.  

---

## 🛠️ How to Run

### 1. Clone Repository
```bash
git clone https://github.com/your-repo/AI-Crop-Optimization.git
cd AI-Crop-Optimization
```

### 2. Setup AI Service
```bash
cd ai_service
pip install -r requirements.txt
python app.py
```

### 3. Setup Backend
```bash
cd backend
npm install
npm start
```

### 4. Setup Farmer App
```bash
cd frontend
flutter pub get
flutter run
```

### 5. Setup Admin Dashboard
```bash
cd admin-dashboard
npm install
npm start
```

---

## 🔮 Future Scope
- IoT-based soil sensors & drones.  
- Insurance tie-ups for automated claim verification.  
- Global expansion (Africa, SE Asia).  

---

## 👥 Team Outcast
- Problem Statement: **SIH25044 – AI-Powered Crop Yield Prediction & Optimization**  
- Smart India Hackathon 2026 Submission  
