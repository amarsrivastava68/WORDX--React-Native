import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screens/LandingPage';  // Your landing page component
import InfoPage from './screens/InfoPage';
import MainPage from './screens/MainPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="InfoPage" component={InfoPage} />
        <Stack.Screen name="MainPage" component={MainPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
