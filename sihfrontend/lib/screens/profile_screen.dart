import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../services/api_service.dart';

class ProfileScreen extends StatefulWidget {
  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final ApiService _apiService = ApiService();
  Map<String, dynamic>? _profile;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchProfile();
  }

  Future<void> _fetchProfile() async {
    try {
      final profile = await _apiService.getProfile();
      setState(() {
        _profile = profile;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = 'Failed to load profile: $e';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('profile_title'.tr())),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!, style: TextStyle(color: Colors.red)))
              : _profile == null
                  ? Center(child: Text('No profile data.'))
                  : Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Name: ${_profile!['name']}', style: TextStyle(fontSize: 20)),
                          SizedBox(height: 8),
                          Text('Phone: ${_profile!['phone']}', style: TextStyle(fontSize: 20)),
                          SizedBox(height: 8),
                          Text('District: ${_profile!['location']}', style: TextStyle(fontSize: 20)),
                          SizedBox(height: 32),
                          Text('language_label'.tr(), style: TextStyle(fontSize: 20)),
                          Row(
                            children: [
                              ElevatedButton(
                                onPressed: () {
                                  context.setLocale(Locale('en'));
                                },
                                child: Text('English'),
                              ),
                              SizedBox(width: 16),
                              ElevatedButton(
                                onPressed: () {
                                  context.setLocale(Locale('hi'));
                                },
                                child: Text('हिंदी'),
                              ),
                            ],
                          ),
                          SizedBox(height: 32),
                          ElevatedButton(
                            onPressed: () {
                              _apiService.deleteToken();
                              Navigator.pushReplacementNamed(context, '/');
                            },
                            child: Text('logout_button'.tr()),
                            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                          )
                        ],
                      ),
                    ),
    );
  }
}