import React, { useRef  , useState} from "react";
import { View, Image, StyleSheet, Alert, Animated, TouchableOpacity, Text } from "react-native";
import WrapperComponent from "../components/Wrapper";

// Function to generate random capital letters without repeating
const getRandomLetters = () => {
  const letters = "ABCDEFGHIJKMNOPQRSTUVWXZ".split("");
  const guaranteedLetters = "AEIOUSTRYL".split("");
  
  // Select 2 letters from "AEIOUSTR"
  const selectedGuaranteedLetters = [];
  while (selectedGuaranteedLetters.length < 2) {
    const randomIndex = Math.floor(Math.random() * guaranteedLetters.length);
    const letter = guaranteedLetters.splice(randomIndex, 1)[0]; // Remove and return letter
    selectedGuaranteedLetters.push(letter);
  }

  // Now fill the rest with random letters from the full alphabet, avoiding duplicates
  const randomLetters = [];
  while (randomLetters.length < 4) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const letter = letters.splice(randomIndex, 1)[0]; // Remove and return letter
    if (!selectedGuaranteedLetters.includes(letter)) { // Ensure no duplicates
      randomLetters.push(letter);
    }
  }

  // Combine guaranteed letters and random letters
  const finalLetters = [...selectedGuaranteedLetters, ...randomLetters];

  // Shuffle the final letters array
  for (let i = finalLetters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [finalLetters[i], finalLetters[j]] = [finalLetters[j], finalLetters[i]]; // Swap
  }

  return finalLetters;
};

export default function RollDicePage({ route  , navigation}) {
  const { userName } = route.params;
  const [randomLetters , setRandomLetters] = useState(null)

  // Create an animated value for shaking effect
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Function to handle the shake animation
  const handleRollDice = () => {
    // Shake the image for 2 seconds
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10, // Move image by 10 units
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10, // Move back by 10 units
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 7 } // Repeat the sequence for ~2 seconds
    ).start(() => {
      const letters = getRandomLetters();
      setRandomLetters(letters);
      
      // Delay the navigation by 1 second (1000 milliseconds)
      setTimeout(() => {
        navigation.navigate('GamePage', { userName, randomLetters: letters });
      }, 1000);
    });
  };


  // Define the buttons array with a single button
  const buttons = [
    {
      label: "ROLL DICE",
      onPress: handleRollDice, // Trigger shake on button press
    },
  ];

  // Apply shakeAnimation to the transform property of the image
  const shakeStyle = {
    transform: [{ translateX: shakeAnimation }],
  };

  // Generate random capital letters for the dice buttons

  // Fixed random positions for the dice (x, y coordinates)
  const dicePositions = [
    { left: 50, top: 100 },
    { left: 100, top: 200 },
    { left: 150, top: 120 },
    { left: 200, top: 250 },
    { left: 250, top: 140 },
    { left: 300, top: 290 },
  ];

  return (
    <WrapperComponent
      points={0}
      onVolumePress={() => alert("Volume")}
      onDarkModePress={() => alert("Dark Mode")}
      buttons={buttons}
    >
      <View style={styles.container}>
        {/* Six square buttons representing dice with random letters */}
        <View style={styles.diceContainer}>
          {randomLetters && randomLetters.map((letter, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.diceButton, dicePositions[index]]} // Apply fixed position to each dice
            >
              <Text style={styles.diceText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Display an animated image below the dice */}
        <View style={styles.imageContainer}>
          <Animated.Image
            source={require("../assets/cup.png")} // Replace with your actual image path
            style={[styles.cupImage, shakeStyle]} // Add shakeStyle for animation
            resizeMode="contain"
          />
        </View>
      </View>
    </WrapperComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  diceContainer: {
    position: "absolute", // Absolute positioning for fixed placement
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  diceButton: {
    position: "absolute", // Each button will have absolute positioning
    width: 60,
    height: 60,
    backgroundColor: "navy",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    shadowColor: "black", // Shadow for 3D effect
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 10, // Elevation for Android shadow
  },
  diceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "#aaa", // Add text shadow for depth
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end", // Ensure the image is at the bottom
    alignItems: "center", // Center the image horizontally
  },
  cupImage: {
    width: 300, // Adjust the width as needed
    height: 300, // Adjust the height as needed
    marginBottom: 20, // Adds some space between the image and the bottom
  },
});

