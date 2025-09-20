import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  final String Function(String) t;
  ProfileScreen({required this.t});
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(title: Text('Profile')),
      body: Center(child: Text('User profile page')),
    );
  }
}