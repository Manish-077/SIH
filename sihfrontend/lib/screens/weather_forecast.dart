import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class WeatherForecast extends StatefulWidget {
  @override
  _WeatherForecastState createState() => _WeatherForecastState();
}

class _WeatherForecastState extends State<WeatherForecast> {
  // IMPORTANT: Replace with your own OpenWeatherMap API key
  final String _apiKey = 'YOUR_API_KEY';
  final String _city = 'Delhi'; // Example city
  List<dynamic> _forecast = [];
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchWeather();
  }

  Future<void> _fetchWeather() async {
    // Using mock data since API key is not available
    setState(() {
      _isLoading = false;
      _forecast = [
        {'dt_txt': '2025-09-23 12:00:00', 'main': {'temp': 30.0}, 'weather': [{'icon': '01d', 'description': 'clear sky'}]},
        {'dt_txt': '2025-09-24 12:00:00', 'main': {'temp': 31.0}, 'weather': [{'icon': '02d', 'description': 'few clouds'}]},
        {'dt_txt': '2025-09-25 12:00:00', 'main': {'temp': 32.0}, 'weather': [{'icon': '03d', 'description': 'scattered clouds'}]},
        {'dt_txt': '2025-09-26 12:00:00', 'main': {'temp': 33.0}, 'weather': [{'icon': '04d', 'description': 'broken clouds'}]},
        {'dt_txt': '2025-09-27 12:00:00', 'main': {'temp': 34.0}, 'weather': [{'icon': '10d', 'description': 'rain'}]},
      ];
    });
    
    if (_apiKey == 'YOUR_API_KEY') {
      setState(() {
        _error = 'Please replace "YOUR_API_KEY" with your OpenWeatherMap API key.';
      });
      return;
    }

    final url = 'https://api.openweathermap.org/data/2.5/forecast?q=$_city&appid=$_apiKey&units=metric';

    try {
      final response = await http.get(Uri.parse(url));
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          _forecast = data['list'];
          _isLoading = false;
        });
      } else {
        setState(() {
          _error = 'Failed to load weather data';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = 'Failed to load weather data: $e';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('5-Day Weather Forecast')),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!, style: TextStyle(color: Colors.red)))
              : ListView.builder(
                  itemCount: _forecast.length,
                  itemBuilder: (context, index) {
                    final item = _forecast[index];
                    return Card(
                      margin: EdgeInsets.all(8.0),
                      child: ListTile(
                        leading: Image.network('https://openweathermap.org/img/w/${item['weather'][0]['icon']}.png'),
                        title: Text('${item['main']['temp']}°C'),
                        subtitle: Text(item['weather'][0]['description']),
                        trailing: Text(item['dt_txt']),
                      ),
                    );
                  },
                ),
    );
  }
}