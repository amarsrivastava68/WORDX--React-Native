import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function LandingPage({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('InfoPage');  // Navigates to MainPage after 3 seconds
    }, 2000);

    return () => clearTimeout(timer);  // Clear timeout if component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Top 80% section with navy background */}
      <View style={styles.topSection}>
        {/* Icon in the middle */}
        <Image
          source={require('../assets/opened-book-3163 (3).png')} // Replace with your icon path
          style={styles.icon}
        />
        {/* Brand Name */}
        <Text style={styles.brandName}>WORDX</Text>
      </View>

      {/* Bottom 25% section */}
      <View style={styles.bottomSection}>
        <Text style={styles.footerText}>Increase your knowledge with WordX!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  topSection: {
    flex: 7,
    backgroundColor: 'navy',
    justifyContent: 'center',
    alignItems: 'center',
   borderRadius : 80,
   borderTopRightRadius : 0,
   borderTopLeftRadius : 0
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,  // Adjust the width as needed
    height: 100,  // Adjust the height as needed
    marginBottom: 20,  // Space between icon and brand name
    borderRadius: 5,  // Half of width and height for a perfect circle
    backgroundColor: 'transparent',  // Ensure background remains transparent
    padding : 5, 
    margin : 5
  },
  
  
  brandName: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 2, 
  },
  footerText: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
  },
  
});
