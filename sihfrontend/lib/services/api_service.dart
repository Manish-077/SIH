import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../config.dart';

class ApiService {
  final _storage = const FlutterSecureStorage();

  Future<String?> _getToken() async {
    return await _storage.read(key: 'jwt_token');
  }

  Future<void> _saveToken(String token) async {
    await _storage.write(key: 'jwt_token', value: token);
  }

  Future<void> deleteToken() async {
    await _storage.delete(key: 'jwt_token');
  }

  Future<Map<String, dynamic>> login(String phone, String password) async {
    final response = await http.post(
      Uri.parse('${Config.apiUrl}/farmer/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'phone': phone, 'password': password}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      await _saveToken(data['token']);
      return data;
    } else {
      throw Exception('Failed to login: ${response.body}');
    }
  }

  Future<Map<String, dynamic>> register({
    required String name,
    required String phone,
    required String password,
    String? location,
  }) async {
    final response = await http.post(
      Uri.parse('${Config.apiUrl}/farmer/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'name': name,
        'phone': phone,
        'password': password,
        'location': location ?? '',
      }),
    );

    if (response.statusCode == 201) {
      final data = jsonDecode(response.body);
      await _saveToken(data['token']);
      return data;
    } else {
      throw Exception('Failed to register: ${response.body}');
    }
  }

  Future<Map<String, dynamic>> getProfile() async {
    final token = await _getToken();
    if (token == null) {
      throw Exception('Not authenticated. Please login again.');
    }

    final response = await http.get(
      Uri.parse('${Config.apiUrl}/farmers/profile'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to get profile: ${response.body}');
    }
  }

  Future<Map<String, dynamic>> predictCropYield({
    required double N,
    required double P,
    required double K,
    required double temperature,
    required double humidity,
    required double ph,
    required double rainfall,
    required String crop,
    required String soil_type,
    required double fertilizer,
  }) async {
    final token = await _getToken();
    if (token == null) {
      throw Exception('Not authenticated. Please login again.');
    }

    final response = await http.post(
      Uri.parse('${Config.apiUrl}/farmers/predict'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode({
        'N': N,
        'P': P,
        'K': K,
        'temperature': temperature,
        'humidity': humidity,
        'ph': ph,
        'rainfall': rainfall,
        'crop': crop,
        'soil_type': soil_type,
        'fertilizer': fertilizer,
      }),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to get crop prediction: ${response.body}');
    }
  }
}