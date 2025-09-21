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
├── sihfrontend/            # Flutter Farmer App
├── Admin_Dashboard/        # React Admin Web App
├── backend-main/           # Node.js + Express + MongoDB
├── ai_service/             # Python AI Microservice
└── docs/                   # Documentation (wireframes, ppt, readme)
```

---

## ⚡ Tech Stack
- **Frontend (Farmer App):** Flutter  
- **Admin Dashboard:** React.js  
- **Backend:** Node.js + Express + MongoDB  
- **AI Service:** Python, Flask, Scikit-learn  
- **APIs & Data Sources:** OpenWeather, IMD, Landsat/Sentinel-2, Soil Health Card  

---

## 🛠️ Setup Instructions

### 1. AI Service (Flask)
- Install Python 3.9+, `pip install -r requirements.txt`
- Run: `python app.py`
- Ensure model files (`yield_model.pkl`, etc.) are present

### 2. Backend (Node.js)
- Install Node.js, `npm install`
- Set up `.env` with MongoDB URI, JWT secret, AI service URL
- Run: `nodemon app.js`

### 3. Farmer App (Flutter)
- Install Flutter SDK
- Run: `flutter pub get`
- Run: `flutter run`
- Update API base URL in `config.dart` if needed

### 4. Admin Dashboard (React)
- Install Node.js, `npm install`
- Set `REACT_APP_API_BASE_URL` in `.env`
- Run: `npm run dev`

---

## ✅ Demo Checklist
- All screens filled with real or demo data
- Farmer → Backend → AI → DB → Admin flow works
- No empty pages
- Multi-language support (English/Hindi)
- Analytics and charts for admin
- Secure authentication and validation
- Easy environment switching (localhost/production)

---

## 🏆 SIH Judging Tips
- Show end-to-end flow: Farmer input → prediction → analytics
- Highlight multi-language and accessibility features
- Demonstrate admin dashboard insights and dataset upload
- Mention security, scalability, and real-world impact

## 🏆 SIH Pitch Tips
- **Start with the problem:** Briefly explain the real-world challenge for farmers and why your solution matters.
- **Show the full flow:** Demo Farmer App input → prediction → analytics in Admin Dashboard.
- **Highlight AI:** Explain how your ML model adapts to new data and can be retrained with admin-uploaded datasets.
- **Emphasize impact:** Mention how your system helps farmers, government, and insurance companies.
- **Accessibility:** Point out multi-language support and offline/SMS features for rural users.
- **Security:** Note use of JWT, validation, and secure data storage.
- **Scalability:** Mention cloud-readiness and easy environment switching.
- **Teamwork:** Credit your team and mention collaboration.

## 🎬 Demo Script
1. **Farmer App:**
   - Login/Signup (show multi-language toggle)
   - Enter soil, rainfall, temp, fertilizer
   - Get prediction and see weather/schemes/profile
2. **Backend:**
   - Show logs/API calls for prediction and data storage
3. **Admin Dashboard:**
   - Login, view analytics, charts, farmers, upload dataset
   - Show how new data can retrain the AI model
4. **Wrap-up:**
   - Summarize impact, scalability, and future roadmap

---

For any issues, check backend/API logs, ensure all services are running, and verify environment variables. Good luck at SIH!

**Good luck! Your project is now optimized for SIH judging and demo.**
