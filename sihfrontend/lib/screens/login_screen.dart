import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../services/api_service.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _apiService = ApiService();
  bool _isLoading = false;

  void _login() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });
      try {
        await _apiService.login(
          _phoneController.text,
          _passwordController.text,
        );
        Navigator.pushReplacementNamed(context, '/dashboard');
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to login: ${e.toString()}')),
        );
      } finally {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('login_title'.tr())),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextFormField(
                controller: _phoneController,
                decoration: InputDecoration(labelText: 'phone_hint'.tr()),
                keyboardType: TextInputType.phone,
                validator: (value) => value!.isEmpty ? 'Please enter your phone number' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _passwordController,
                decoration: InputDecoration(labelText: 'password_hint'.tr()),
                obscureText: true,
                validator: (value) => value!.isEmpty ? 'Please enter your password' : null,
              ),
              SizedBox(height: 32),
              _isLoading
                  ? CircularProgressIndicator()
                  : ElevatedButton(
                      onPressed: _login,
                      child: Text('login_button'.tr()),
                    ),
              TextButton(
                onPressed: () => Navigator.pushNamed(context, '/signup'),
                child: Text('register_prompt'.tr()),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
