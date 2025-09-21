import 'package:flutter/material.dart';
import '../services/api_service.dart';

class CropPrediction extends StatefulWidget {
  final String Function(String) t;
  CropPrediction({required this.t});
  @override
  State<CropPrediction> createState() => _CropPredictionState();
}

class _CropPredictionState extends State<CropPrediction> {
  String location = '';
  String soil = '';
  String rainfall = '';
  String temp = '';
  String prevYield = '';

  void _getPrediction() async {
    final inputData = {
      'location': location,
      'soil': soil,
      'rainfall': rainfall,
      'temp': temp,
      'prevYield': prevYield,
    };
    final prediction = await ApiService().getPrediction(inputData);
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text('Prediction'),
        content: Text(prediction != null ? 'Predicted yield: $prediction' : 'Prediction failed'),
        actions: [TextButton(onPressed: ()=>Navigator.pop(context), child: Text('OK'))]
      )
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Predict Yield')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children:[
            DropdownButtonFormField<String>(
              decoration: InputDecoration(labelText: 'Location (District)', border: OutlineInputBorder()),
              items: ['District 1','District 2'].map((e)=>DropdownMenuItem(value:e, child: Text(e))).toList(),
              onChanged: (v)=>location=v??'',
            ),
            SizedBox(height:12),
            DropdownButtonFormField<String>(
              decoration: InputDecoration(labelText: 'Soil Type', border: OutlineInputBorder()),
              items: ['Clay','Sandy','Loam'].map((e)=>DropdownMenuItem(value:e, child: Text(e))).toList(),
              onChanged: (v)=>soil=v??'',
            ),
            SizedBox(height:12),
            TextFormField(decoration: InputDecoration(labelText:'Rainfall (mm)', border: OutlineInputBorder()), keyboardType: TextInputType.number, onChanged:(v)=>rainfall=v),
            SizedBox(height:12),
            TextFormField(decoration: InputDecoration(labelText:'Temperature (°C)', border: OutlineInputBorder()), keyboardType: TextInputType.number, onChanged:(v)=>temp=v),
            SizedBox(height:12),
            TextFormField(decoration: InputDecoration(labelText:'Previous Yield (quintals/acre)', border: OutlineInputBorder()), keyboardType: TextInputType.number, onChanged:(v)=>prevYield=v),
            SizedBox(height:18),
            SizedBox(width:double.infinity, child: ElevatedButton(onPressed: _getPrediction, child: Text('Get Prediction'))),
          ]
        )
      )
    );
  }
}