import React, { useRef, useState, useEffect, useContext } from "react";

import {
  View,
  
  StyleSheet,
  
  Animated,
  Pressable,
  Text,
} from "react-native";
import WrapperComponent from "../components/Wrapper";
import { UserContext, actionTypes } from "../context/userContext";
import { SettingsContext } from "../context/settingsContext";

const getRandomLetters = () => {
  const letters = "ABCDEFGHIJKMNOPUVWXZ".split("");
  const guaranteedLetters = "AEIOUSTRYL".split("");

  const selectedGuaranteedLetters = [];
  while (selectedGuaranteedLetters.length < 2) {
    const randomIndex = Math.floor(Math.random() * guaranteedLetters.length);
    const letter = guaranteedLetters.splice(randomIndex, 1)[0]; // Remove and return letter
    selectedGuaranteedLetters.push(letter);
  }

  const randomLetters = [];
  while (randomLetters.length < 4) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const letter = letters.splice(randomIndex, 1)[0]; // Remove and return letter
    if (!selectedGuaranteedLetters.includes(letter)) {
      // Ensure no duplicates
      randomLetters.push(letter);
    }
  }

  const finalLetters = [...selectedGuaranteedLetters, ...randomLetters];

  for (let i = finalLetters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [finalLetters[i], finalLetters[j]] = [finalLetters[j], finalLetters[i]]; // Swap
  }

  return finalLetters;
};

export default function RollDicePage({ navigation }) {
  const { settingsState :{isDarkMode} } = useContext(SettingsContext); 
  const { dispatch } = useContext(UserContext);
  const [randomLetters, setRandomLetters] = useState(null);

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const handleRollDice = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 7 }
    ).start(() => {
      const letters = getRandomLetters();
      setRandomLetters(letters);

      setTimeout(() => {
        navigation.navigate("GamePage", { randomLetters: letters });
      }, 1000);
    });
  };

  const buttons = [
    {
      label: "ROLL DICE",
      onPress: handleRollDice, // Trigger shake on button press
    },
  ];

  const shakeStyle = {
    transform: [{ translateX: shakeAnimation }],
  };

  const dicePositions = [
    { left: 50, top: 100 },
    { left: 100, top: 200 },
    { left: 150, top: 120 },
    { left: 200, top: 250 },
    { left: 250, top: 140 },
    { left: 300, top: 290 },
  ];
  useEffect(() => {
    setRandomLetters([]);
  }, []);
  return (
    <WrapperComponent timer={false} buttons={buttons}>
      <View style={styles(isDarkMode).container}>
        <View style={styles(isDarkMode).diceContainer}>
          {randomLetters &&
            randomLetters.map((letter, index) => (
              <Pressable
                key={index}
                style={[styles(isDarkMode).diceButton, dicePositions[index]]}
              >
                <Text style={styles(isDarkMode).diceText}>{letter}</Text>
              </Pressable>
            ))}
        </View>

        <View style={styles(isDarkMode).imageContainer}>
          <Animated.Image
            source={require("../assets/cup.png")}
            style={[styles(isDarkMode).cupImage, shakeStyle]}
            resizeMode="contain"
          />
        </View>
      </View>
    </WrapperComponent>
  );
}

const styles = (isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: isDarkMode ? 'black' : 'white',
  },
  diceContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  diceButton: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: isDarkMode ? "darkgray" : "navy",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: isDarkMode ? "lightgray" : "black",

    boxShadow: isDarkMode
      ? '0px 2px 4px rgba(255, 255, 255, 0.1)' 
      : '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  diceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: isDarkMode ? "black" : "white",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cupImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
    
  },
});

