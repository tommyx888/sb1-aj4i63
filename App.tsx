import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClerkProvider } from '@clerk/clerk-expo';
import { LoginScreen } from './src/screens/LoginScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { DocumentViewerScreen } from './src/screens/DocumentViewerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ClerkProvider publishableKey="pk_test_ZW5qb3llZC10b21jYXQtNTEuY2xlcmsuYWNjb3VudHMuZGV2JA">
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="DocumentViewer" component={DocumentViewerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ClerkProvider>
  );
}