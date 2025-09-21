import 'package:http/http.dart' as http;
import 'dart:convert';
import '../config.dart';

class ApiService {
  final String baseUrl = '${AppConfig.apiBaseUrl}/api/predict';

  Future<double?> getPrediction(Map<String, dynamic> inputData) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(inputData),
    );
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['prediction'];
    } else {
      // Handle error
      return null;
    }
  }

  Future<bool> signupFarmer(Map<String, dynamic> inputData) async {
    final response = await http.post(
      Uri.parse('${AppConfig.apiBaseUrl}/api/farmer/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(inputData),
    );
    return response.statusCode == 201;
  }

  Future<dynamic> loginFarmer(Map<String, dynamic> inputData) async {
    final response = await http.post(
      Uri.parse('${AppConfig.apiBaseUrl}/api/farmer/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(inputData),
    );
    if (response.statusCode == 200) {
      return true;
    } else {
      // Treat all errors as invalid credentials for user experience
      return 'invalid';
    }
  }
}