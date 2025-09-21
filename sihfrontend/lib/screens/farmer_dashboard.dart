import 'package:flutter/material.dart';

class FarmerDashboard extends StatelessWidget {
  final Function(String) onNavigate;
  final String Function(String) t;
  final Function(String) setLocale;

  FarmerDashboard({required this.onNavigate, required this.t, required this.setLocale});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Farmer Dashboard'),
        actions: [
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () {
              // Clear any saved login state if needed
              Navigator.pushReplacementNamed(context, '/');
            },
          ),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.all(18),
        child: Column(
          children:[
            Expanded(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children:[
                  _Card(title:'Predict Crop Yield', onTap: () => onNavigate('/crop_prediction')),
                  SizedBox(width:12),
                  _Card(title:'Weather Forecast', onTap: () => onNavigate('/weather_forecast')),
                  SizedBox(width:12),
                  _Card(title:'Govt. Schemes', onTap: () => onNavigate('/govt_schemes')),
                ]
              )
            ),
            Divider(),
            BottomNavigationBar(items: [
              BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Dashboard'),
              BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
              BottomNavigationBarItem(icon: Icon(Icons.settings), label: 'Settings'),
            ], onTap: (i){
              if (i==1) onNavigate('/profile');
            })
          ]
        ),
      )
    );
  }
}

class _Card extends StatelessWidget {
  final String title;
  final VoidCallback onTap;
  _Card({required this.title, required this.onTap});
  @override
  Widget build(BuildContext context){
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          height:160,
          decoration: BoxDecoration(border: Border.all(color: Colors.black38), borderRadius: BorderRadius.circular(12)),
          child: Center(child: Text(title, textAlign: TextAlign.center, style: TextStyle(fontSize:16))),
        ),
      ),
    );
  }
}