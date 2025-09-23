import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../services/api_service.dart';

class FarmerDashboard extends StatelessWidget {
  final ApiService _apiService = ApiService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('app_title'.tr()),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () {
              _apiService.deleteToken();
              Navigator.pushReplacementNamed(context, '/');
            },
          )
        ],
      ),
      body: GridView.count(
        crossAxisCount: 2,
        padding: const EdgeInsets.all(16.0),
        children: <Widget>[
          _buildDashboardCard(context, Icons.agriculture, 'predict_yield_title'.tr(), '/crop_prediction'),
          _buildDashboardCard(context, Icons.wb_sunny, 'Weather Forecast', '/weather_forecast'),
          _buildDashboardCard(context, Icons.account_balance, 'Govt. Schemes', '/govt_schemes'),
          _buildDashboardCard(context, Icons.person, 'Profile', '/profile'),
        ],
      ),
    );
  }

  Widget _buildDashboardCard(BuildContext context, IconData icon, String title, String route) {
    return Card(
      margin: const EdgeInsets.all(8.0),
      child: InkWell(
        onTap: () => Navigator.pushNamed(context, route),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Icon(icon, size: 50.0, color: Theme.of(context).primaryColor),
            SizedBox(height: 10.0),
            Text(title, textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}
