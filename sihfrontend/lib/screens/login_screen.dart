import 'package:flutter/material.dart';
import 'package:flutter/services.dart'; // for FilteringTextInputFormatter

import '../../../services/api_service.dart'; // Update with your actual import

class LoginScreen extends StatefulWidget {
  final VoidCallback onLogin;
  final String Function(String) t;
  LoginScreen({required this.onLogin, required this.t});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  String phone = '';
  String password = '';

  void _submit() async {
    if (_formKey.currentState?.validate() ?? false) {
      // Call backend to check if farmer exists and password matches
      final res = await ApiService().loginFarmer({
        'phone': phone,
        'password': password,
      });
      if (res == true) {
        widget.onLogin();
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Invalid credentials.')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: EdgeInsets.symmetric(horizontal: 24.0, vertical: 30),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(children: [
                  CircleAvatar(radius: 24, backgroundColor: Colors.grey[200]),
                  SizedBox(width: 10),
                  Text(
                    'Kisan Seva',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  )
                ]),
                SizedBox(height: 30),

                // ✅ Fixed Mobile Number Field
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Mobile Number',
                    border: OutlineInputBorder(),
                    counterText: "", // ✅ stops layout jump
                  ),
                  keyboardType: TextInputType.number,
                  inputFormatters: [
                    FilteringTextInputFormatter.digitsOnly,
                  ],
                  maxLength: 10,
                  onChanged: (v) => phone = v,
                  validator: (v) {
                    if (v == null || v.length != 10) return 'Enter a valid 10-digit mobile number';
                    return null;
                  },
                ),
                SizedBox(height: 16),

                // Password Field
                TextFormField(
                  decoration: InputDecoration(
                    labelText: 'Password',
                    border: OutlineInputBorder(),
                  ),
                  obscureText: true,
                  onChanged: (v) => password = v,
                  validator: (v) {
                    if (v == null || v.isEmpty) return 'Password required';
                    return null;
                  },
                ),
                SizedBox(height: 24),

                // Login Button
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _submit,
                    child: Text('Login'),
                  ),
                ),
                SizedBox(height: 12),

                // Extra Links
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    TextButton(
                        onPressed: () {
                          Navigator.pushNamed(context, '/signup');
                        },
                        child: Text('New User? Register here')),
                    TextButton(
                        onPressed: () {}, child: Text('Forgot Password?')),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
