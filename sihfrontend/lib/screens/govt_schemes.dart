import 'package:flutter/material.dart';

class GovtSchemes extends StatelessWidget {
  final String Function(String) t;
  GovtSchemes({required this.t});
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(title: Text('Govt. Schemes')),
      body: Center(child: Text('List of government schemes')),
    );
  }
}