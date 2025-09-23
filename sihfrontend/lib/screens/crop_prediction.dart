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

  final _soilController = TextEditingController();
  final _rainfallController = TextEditingController();
  final _tempController = TextEditingController();
  final _fertilizerController = TextEditingController();
  // New controllers for missing parameters
  final _nController = TextEditingController();
  final _pController = TextEditingController();
  final _kController = TextEditingController();
  final _humidityController = TextEditingController();
  final _phController = TextEditingController();
  final _cropController = TextEditingController();

  bool _isLoading = false;
  Map<String, dynamic>? _predictionResult;

  void _predict() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
        _predictionResult = null;
      });

      try {
        final result = await _apiService.predictCropYield(
          N: double.parse(_nController.text),
          P: double.parse(_pController.text),
          K: double.parse(_kController.text),
          temperature: double.parse(_tempController.text),
          humidity: double.parse(_humidityController.text),
          ph: double.parse(_phController.text),
          rainfall: double.parse(_rainfallController.text),
          crop: _cropController.text,
          soil_type: _soilController.text,
          fertilizer: double.parse(_fertilizerController.text),
        );
        setState(() {
          _predictionResult = result;
        });
        _showResultDialog(result['prediction'].toString());
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${e.toString()}')),
        );
      } finally {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _showResultDialog(String yield) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('prediction_result_title'.tr()),
        content: Text('$yield ${'yield_unit'.tr()}'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('OK'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('predict_yield_title'.tr())),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              TextFormField(
                controller: _nController,
                decoration: InputDecoration(labelText: 'N (Nitrogen)'.tr()),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _pController,
                decoration: InputDecoration(labelText: 'P (Phosphorus)'.tr()),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _kController,
                decoration: InputDecoration(labelText: 'K (Potassium)'.tr()),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _tempController,
                decoration: InputDecoration(labelText: 'temperature_hint'.tr()),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _humidityController,
                decoration: InputDecoration(labelText: 'Humidity'.tr()),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _phController,
                decoration: InputDecoration(labelText: 'pH'.tr()),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _rainfallController,
                decoration: InputDecoration(labelText: 'rainfall_hint'.tr()),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _cropController,
                decoration: InputDecoration(labelText: 'Crop Type'.tr()),
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _soilController,
                decoration: InputDecoration(labelText: 'soil_type_hint'.tr()),
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _fertilizerController,
                decoration: InputDecoration(labelText: 'fertilizer_hint'.tr()),
                keyboardType: TextInputType.number,
                validator: (value) => value!.isEmpty ? 'Required' : null,
              ),
              SizedBox(height: 32),
              _isLoading
                  ? Center(child: CircularProgressIndicator())
                  : ElevatedButton(
                      onPressed: _predict,
                      child: Text('predict_button'.tr()),
                    ),
            ],
          ),
        ),
      ),
    );
  }
}