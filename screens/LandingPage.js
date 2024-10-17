import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function LandingPage({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("InfoPage"); 
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require("../assets/opened-book-3163 (3).png")} 
          style={styles.icon}
        />
        
        <Text style={styles.brandName}>WORDX</Text>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.footerText}>
          Increase your knowledge with WordX!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    flex: 7,
    backgroundColor: "navy",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  bottomSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 100, 
    height: 100, 
    marginBottom: 20, 
    borderRadius: 5, 
    backgroundColor: "transparent", 
    padding: 5,
    margin: 5,
  },

  brandName: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  footerText: {
    fontSize: 20,
    color: "gray",
    textAlign: "center",
  },
});
