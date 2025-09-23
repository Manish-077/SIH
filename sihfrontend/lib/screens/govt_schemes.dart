import 'package:flutter/material.dart';

class GovtSchemes extends StatelessWidget {
  final List<Map<String, String>> schemes = [
    {
      'title': 'PM-Kisan Scheme',
      'description': 'An income support scheme for all landholding farmer families.',
    },
    {
      'title': 'Soil Health Card Scheme',
      'description': 'A scheme to provide farmers with information about the nutrient status of their soil.',
    },
    {
      'title': 'Pradhan Mantri Fasal Bima Yojana',
      'description': 'A crop insurance scheme to provide financial support to farmers in the event of crop failure.',
    },
    {
      'title': 'Kisan Credit Card (KCC) Scheme',
      'description': 'A scheme to provide farmers with timely access to credit.',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Government Schemes')),
      body: ListView.builder(
        itemCount: schemes.length,
        itemBuilder: (context, index) {
          final scheme = schemes[index];
          return Card(
            margin: EdgeInsets.all(8.0),
            child: ListTile(
              title: Text(scheme['title']!),
              subtitle: Text(scheme['description']!),
            ),
          );
        },
      ),
    );
  }
}