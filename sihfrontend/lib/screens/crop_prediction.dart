import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../services/api_service.dart';

class CropPrediction extends StatefulWidget {
  @override
  _CropPredictionState createState() => _CropPredictionState();
}

class _CropPredictionState extends State<CropPrediction> {
  final _formKey = GlobalKey<FormState>();
  final _apiService = ApiService();
  bool _isLoading = false;
  String? _predictedYield;

  // Form controllers
  final _rainfallController = TextEditingController();
  final _temperatureController = TextEditingController();
  final _waterAvailabilityController = TextEditingController();
  final _fertilizerController = TextEditingController();

  // Dropdown values
  String? _selectedCrop;
  String? _selectedSoilType;

  final _crops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane'];
  final _soilTypes = ['Sandy', 'Loamy', 'Clay', 'Alluvial', 'Black Soil'];

  void _predictYield() async {
    print('Predict yield button pressed');
    if (_formKey.currentState!.validate()) {
      print('Form is valid');
      setState(() {
        _isLoading = true;
        _predictedYield = null;
      });

      try {
        final params = {
          'N': 0,
          'P': 0,
          'K': 0,
          'temperature': double.parse(_temperatureController.text),
          'humidity': double.parse(_waterAvailabilityController.text),
          'ph': 0,
          'rainfall': double.parse(_rainfallController.text),
          'crop': _selectedCrop!,
          'soil_type': _selectedSoilType!,
          'fertilizer': double.parse(_fertilizerController.text),
        };
        print('Sending prediction request with params: $params');

        final result = await _apiService.predictCropYield(
          N: 0,
          P: 0,
          K: 0,
          temperature: double.parse(_temperatureController.text),
          humidity: double.parse(_waterAvailabilityController.text),
          ph: 0,
          rainfall: double.parse(_rainfallController.text),
          crop: _selectedCrop!,
          soil_type: _selectedSoilType!,
          fertilizer: double.parse(_fertilizerController.text),
        );

        print('Prediction result: $result');

        setState(() {
          _predictedYield = result['prediction'].toString();
        });
      } catch (e) {
        print('Error predicting yield: $e');
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to predict yield: ${e.toString()}')),
        );
      } finally {
        setState(() {
          _isLoading = false;
        });
      }
    } else {
      print('Form is invalid');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('crop_prediction'.tr())),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              DropdownButtonFormField<String>(
                value: _selectedCrop,
                decoration: InputDecoration(labelText: 'Crop'),
                items: _crops.map((crop) {
                  return DropdownMenuItem(value: crop, child: Text(crop));
                }).toList(),
                onChanged: (value) => setState(() => _selectedCrop = value),
                validator: (value) => value == null ? 'Please select a crop' : null,
              ),
              SizedBox(height: 16),
              DropdownButtonFormField<String>(
                value: _selectedSoilType,
                decoration: InputDecoration(labelText: 'Soil Type'),
                items: _soilTypes.map((soil) {
                  return DropdownMenuItem(value: soil, child: Text(soil));
                }).toList(),
                onChanged: (value) => setState(() => _selectedSoilType = value),
                validator: (value) => value == null ? 'Please select a soil type' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _rainfallController,
                decoration: InputDecoration(labelText: 'Rainfall (mm)'),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Please enter rainfall' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _temperatureController,
                decoration: InputDecoration(labelText: 'Temperature (°C)'),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Please enter temperature' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _waterAvailabilityController,
                decoration: InputDecoration(labelText: 'Water Availability (%)'),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Please enter water availability' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _fertilizerController,
                decoration: InputDecoration(labelText: 'Fertilizer Usage (kg/acre)'),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Please enter fertilizer usage' : null,
              ),
              SizedBox(height: 32),
              _isLoading
                  ? Center(child: CircularProgressIndicator())
                  : ElevatedButton(
                      onPressed: _predictYield,
                      child: Text('predict_yield'.tr()),
                    ),
              if (_predictedYield != null)
                Padding(
                  padding: const EdgeInsets.only(top: 20.0),
                  child: Text(
                    'Estimated Yield: $_predictedYield quintals/acre',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    textAlign: TextAlign.center,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}