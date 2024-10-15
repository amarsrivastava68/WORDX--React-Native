import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

export default function InfoPage({ navigation }) {
  const [name, setName] = useState(null);
  const handleGetStarted = () => {
    if (name.trim()) {
      // Navigate to the main screen
      navigation.navigate("RollDicePage", { userName: name });
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Outermost Circle (lightest color) */}
        <View style={styles.outerCircle1}>
          {/* Second Circle (medium light color) */}
          <View style={styles.outerCircle2}>
            {/* Innermost Circle (darkest color) */}
            <View style={styles.outerCircle3}>
              {/* Main content with icon and brand name */}
              <Image
                source={require("../assets/opened-book-3163 (5).png")} // Replace with your icon path
                style={styles.icon}
              />
              <Text style={styles.brandName}>WORDX</Text>
            </View>
          </View>
        </View>

        {/* New section below the outer circle */}
        <View style={styles.newSection}>
          <Text style={styles.paragraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your name"
            value={name} // Set the value to the name state
            onChangeText={setName} // Update the name state on change
          />
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes full height
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1, // Allow the ScrollView to grow
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20, // Add some padding at the bottom
  },
  // Outermost Circle (lightest color)
  outerCircle1: {
    borderColor: "rgba(0, 0, 0, 0.1)", // Lightest border color
    borderWidth: 3, // Border width
    borderRadius: 175, // Must be more than the other circles for a perfect circle
    width: 350, // Set width for outer circle
    height: 350, // Set height for outer circle
    alignItems: "center",
    justifyContent: "center",
    margin: 20, // Cushion space between circles
  },
  // Second Circle (medium light color)
  outerCircle2: {
    borderColor: "rgba(0, 0, 0, 0.5)", // Medium border color
    borderWidth: 3, // Border width
    borderRadius: 150, // Adjust radius slightly for inner circle
    width: 300, // Set width for middle circle
    height: 300, // Set height for middle circle
    alignItems: "center",
    justifyContent: "center",
    margin: 30, // Cushion space between circles
  },
  // Innermost Circle (darkest color)
  outerCircle3: {
    borderColor: "black", // Darkest color for the innermost circle
    borderWidth: 3, // Border width
    borderRadius: 125, // Adjust radius slightly for innermost circle
    width: 250, // Set width for innermost circle
    height: 250, // Set height for innermost circle
    alignItems: "center",
    justifyContent: "center",
    margin: 40, // Cushion space between circles
  },
  icon: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 10, // Space between icon and brand name
  },
  brandName: {
    fontSize: 50, // Adjust font size if needed to fit
    color: "black",
    fontWeight: "bold",
    letterSpacing: 2, // To add some space between letters
  },
  // New section styles
  newSection: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%", // Full width for the new section
    padding: 20, // Add padding for spacing
  },
  paragraph: {
    fontSize: 20,
    textAlign: "left",
    marginBottom: 15, // Space between paragraph and input field
  },
  inputField: {
    width: "100%", // Full width for the input field
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15, // Space between input field and button
  },
  button: {
    backgroundColor: "#007BFF", // Primary color for the button
    padding: 15,
    borderRadius: 10, // Increased radius for a more rounded effect
    width: "100%", // Full width for the button
    alignItems: "center",
    justifyContent: "center", // Center the button text
    elevation: 5, // Adds a shadow effect on Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: {
      width: 0, // Horizontal shadow offset
      height: 2, // Vertical shadow offset
    },
    shadowOpacity: 0.3, // Opacity of the shadow
    shadowRadius: 5, // Radius of the shadow
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
