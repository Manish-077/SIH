import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  final String Function(String) t;
  ProfileScreen({required this.t});
  final Map<String, String> demoProfile = {
    'name': 'Ramesh Kumar',
    'location': 'District 1',
    'phone': '9876543210',
    'lastYield': '18 quintals/acre',
  };
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(title: Text('Profile')),
      body: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Name: ${demoProfile['name']}', style: TextStyle(fontSize:18)),
            SizedBox(height:8),
            Text('Location: ${demoProfile['location']}'),
            SizedBox(height:8),
            Text('Phone: ${demoProfile['phone']}'),
            SizedBox(height:8),
            Text('Last Yield: ${demoProfile['lastYield']}'),
          ],
        ),
      ),
    );
  }
}