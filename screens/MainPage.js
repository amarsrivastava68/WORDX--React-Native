import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import WrapperComponent from '../components/Wrapper';

export default function MainScreen({ route }) {
  const { userName } = route.params;

  // Define the buttons array with a single button
  const buttons = [
    { 
      label: "Next", 
      onPress: () => Alert.alert("Button Pressed", `Welcome, ${userName}!`)
    } ,
    
  ];

  return (
    <WrapperComponent 
      points={0} 
      timer="00:00" 
      onVolumePress={() => alert("Volume")} 
      onDarkModePress={() => alert("Dark Mode")} 
      buttons={buttons}
    >
      <Text style={styles.welcomeText}>Main Content for {userName}</Text>
    </WrapperComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
