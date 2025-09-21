import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../services/api_service.dart';

class SignupScreen extends StatefulWidget {
  final VoidCallback onSignup;
  final String Function(String) t;
  SignupScreen({required this.onSignup, required this.t});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _formKey = GlobalKey<FormState>();
  String phone = '';
  String password = '';
  String name = '';
  String location = '';

  void _submit() async {
    if (_formKey.currentState?.validate() ?? false) {
      // Example backend call
      final res = await ApiService().signupFarmer({
        'name': name,
        'phone': phone,
        'password': password,
        'location': location,
      });
      if (res) {
        widget.onSignup();
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Signup failed')));
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
                TextFormField(
                  decoration: InputDecoration(labelText: 'Name', border: OutlineInputBorder()),
                  onChanged: (v) => name = v,
                  validator: (v) {
                    if (v == null || v.isEmpty) return 'Name required';
                    return null;
                  },
                ),
                SizedBox(height: 16),
                TextFormField(
                  decoration: InputDecoration(labelText: 'Location', border: OutlineInputBorder()),
                  onChanged: (v) => location = v,
                  validator: (v) {
                    if (v == null || v.isEmpty) return 'Location required';
                    return null;
                  },
                ),
                SizedBox(height: 16),
                TextFormField(
                  decoration: InputDecoration(labelText: 'Mobile Number', border: OutlineInputBorder(), counterText: ""),
                  keyboardType: TextInputType.number,
                  inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                  maxLength: 10,
                  onChanged: (v) => phone = v,
                  validator: (v) {
                    if (v == null || v.length != 10) return 'Enter a valid 10-digit mobile number';
                    return null;
                  },
                ),
                SizedBox(height: 16),
                TextFormField(
                  decoration: InputDecoration(labelText: 'Password', border: OutlineInputBorder()),
                  obscureText: true,
                  onChanged: (v) => password = v,
                  validator: (v) {
                    if (v == null || v.isEmpty) return 'Password required';
                    return null;
                  },
                ),
                SizedBox(height: 24),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _submit,
                    child: Text('Sign Up'),
                  ),
                ),
                SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    TextButton(
                      onPressed: () {
                        Navigator.pushReplacementNamed(context, '/');
                      },
                      child: Text('Already have an account? Login'),
                    ),
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
