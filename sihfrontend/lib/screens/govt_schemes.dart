import 'package:flutter/material.dart';

class GovtSchemes extends StatelessWidget {
  final String Function(String) t;
  GovtSchemes({required this.t});
  final List<Map<String, String>> schemes = [
    {'title': 'PM-KISAN', 'desc': 'Income support to farmers'},
    {'title': 'Soil Health Card', 'desc': 'Soil quality improvement'},
    {'title': 'Crop Insurance', 'desc': 'Insurance for crop loss'},
  ];
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(title: Text('Govt. Schemes')),
      body: ListView.builder(
        itemCount: schemes.length,
        itemBuilder: (ctx, i) => Card(
          child: ListTile(
            title: Text(schemes[i]['title']!),
            subtitle: Text(schemes[i]['desc']!),
          ),
        ),
      ),
    );
  }
}