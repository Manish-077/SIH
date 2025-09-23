// A very simple test to ensure the app's main widget loads and displays a title.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:kisan_seva/main.dart'; // The entry point of your app

void main() {
  testWidgets('App displays the correct title on launch', (WidgetTester tester) async {
    // 1. Build our app's main widget.
    await tester.pumpWidget(const MyApp());

    // 2. Verify that the app's title is present on the screen.
    // Replace 'Kisan Seva' with the actual title of your app's initial screen.
    expect(find.text('Kisan Seva'), findsOneWidget);
    
    // You could also check for the presence of a login button or other key elements.
    // expect(find.byType(ElevatedButton), findsOneWidget);
    
  });
}