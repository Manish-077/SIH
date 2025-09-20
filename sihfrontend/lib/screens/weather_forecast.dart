import 'package:flutter/material.dart';

class WeatherForecast extends StatelessWidget {
  final String Function(String) t;
  WeatherForecast({required this.t});
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(title: Text('Weather Forecast')),
      body: Center(child: Text('Weather data coming soon')),
    );
  }
}