import 'package:flutter/material.dart';

class WeatherForecast extends StatelessWidget {
  final String Function(String) t;
  WeatherForecast({required this.t});
  final List<Map<String, String>> demoWeather = [
    {'date': '2025-09-21', 'temp': '32°C', 'rainfall': '12mm', 'desc': 'Sunny'},
    {'date': '2025-09-22', 'temp': '30°C', 'rainfall': '5mm', 'desc': 'Cloudy'},
    {'date': '2025-09-23', 'temp': '28°C', 'rainfall': '20mm', 'desc': 'Rainy'},
  ];
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(title: Text('Weather Forecast')),
      body: ListView.builder(
        itemCount: demoWeather.length,
        itemBuilder: (ctx, i) => Card(
          child: ListTile(
            title: Text('${demoWeather[i]['date']}'),
            subtitle: Text('${demoWeather[i]['desc']}'),
            trailing: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Temp: ${demoWeather[i]['temp']}'),
                Text('Rainfall: ${demoWeather[i]['rainfall']}'),
              ],
            ),
          ),
        ),
      ),
    );
  }
}