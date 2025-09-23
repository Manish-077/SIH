import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';

import 'screens/login_screen.dart';
import 'screens/signup_screen.dart';
import 'screens/farmer_dashboard.dart';
import 'screens/crop_prediction.dart';
import 'screens/weather_forecast.dart';
import 'screens/govt_schemes.dart';
import 'screens/profile_screen.dart';
import 'screens/forgot_password_screen.dart'; // Import ForgotPasswordScreen

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await EasyLocalization.ensureInitialized();

  runApp(
    EasyLocalization(
      supportedLocales: [Locale('en'), Locale('hi')],
      path: 'assets/translations',
      fallbackLocale: Locale('en'),
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kisan Seva',
      theme: ThemeData(primarySwatch: Colors.green),
      debugShowCheckedModeBanner: false,
      localizationsDelegates: context.localizationDelegates,
      supportedLocales: context.supportedLocales,
      locale: context.locale,
      initialRoute: '/',
      routes: {
        '/': (c) => LoginScreen(),
        '/signup': (c) => SignupScreen(),
        '/dashboard': (c) => FarmerDashboard(),
        '/crop_prediction': (c) => CropPrediction(),
        '/weather_forecast': (c) => WeatherForecast(),
        '/govt_schemes': (c) => GovtSchemes(),
        '/profile': (c) => ProfileScreen(),
        '/forgot_password': (c) => ForgotPasswordScreen(),
      },
    );
  }
}
