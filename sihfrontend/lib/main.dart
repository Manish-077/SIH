import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;

import 'screens/login_screen.dart';
import 'screens/farmer_dashboard.dart';
import 'screens/crop_prediction.dart';
import 'screens/weather_forecast.dart';
import 'screens/govt_schemes.dart';
import 'screens/profile_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final en = json.decode(await rootBundle.loadString('assets/translations/en.json'));
  final hi = json.decode(await rootBundle.loadString('assets/translations/hi.json'));
  final translations = {'en': en, 'hi': hi};

  runApp(MyApp(translations: translations));
}

class MyApp extends StatefulWidget {
  final Map<String, dynamic> translations;
  const MyApp({required this.translations, super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String locale = 'en';

  // 🔑 Global API base URL (Backend server)
  static const String apiBaseUrl = "http://localhost:5000/api";
  // ⚠️ Change this when deploying:
  // Example: "http://192.168.1.5:5000/api" (LAN)
  // or "https://yourdomain.com/api" (Production)

  void setLocale(String l) {
    setState(() {
      locale = l;
    });
  }

  String t(String key) {
    return widget.translations[locale]?[key] ?? key;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kisan Seva',
      theme: ThemeData(primarySwatch: Colors.green),
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (c) => LoginScreen(
              onLogin: () => Navigator.pushReplacementNamed(c, '/dashboard'),
              t: t,
            ),
        '/dashboard': (c) => FarmerDashboard(
              onNavigate: (r) => Navigator.pushNamed(c, r),
              t: t,
              setLocale: setLocale,
            ),
        '/crop_prediction': (c) => CropPrediction(t: t),
        '/weather_forecast': (c) => WeatherForecast(t: t),
        '/govt_schemes': (c) => GovtSchemes(t: t),
        '/profile': (c) => ProfileScreen(t: t),
      },
    );
  }
}
