import React, { useState, useRef, useEffect, useCallback  , useContext} from "react";
import { isCommonWord } from "../utils/ValidityChecker";
import { FontAwesome } from '@expo/vector-icons'; // If using Expo

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Alert
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import WrapperComponent from "../components/Wrapper";
import { UserContext } from "../context/userContext";

const GamePage = ({ route, navigation }) => {
  const { randomLetters } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [submittedWords, setSubmittedWords] = useState([]); // Store entered words
  const inputRefs = useRef([]);
 

  const { userName,  setValidWords } = useContext(UserContext); 

  
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Hold on!",
          "Are you sure you want to go back? Your progress will be lost.",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => navigation.goBack() }
          ]
        );
        return true; // Prevent default back behavior
      };

      // Add back button event listener
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        // Remove the event listener when the screen is unfocused or unmounted
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        
    }, [navigation])
  );

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.toUpperCase();
    setOtp(newOtp);

    // Move focus to the next input if the current input is filled and not the last input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredString = otp.join("");
    if (enteredString.trim()) {
      setSubmittedWords(prev => [...prev, enteredString]);
      if (isCommonWord(enteredString)) {
        setValidWords(prev => {
          const newValidWords = [...prev, enteredString];
          console.log("Updated valid words:", newValidWords);
          return newValidWords;
        });
      }
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
    }
  };

  // ... (rest of the component remains the same)


  return (
    <WrapperComponent
      points={0}
      onVolumePress={() => alert("Volume")}
      onDarkModePress={() => alert("Dark Mode")}
      timer={true}
      navigation= {navigation}
      
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Dice Letters Display */}
        <View>
        <Text style={styles.instructionText}>hello {userName}</Text>

          <Text style={styles.instructionText}>Player Instructions:</Text>
          <View style={styles.instructionsList}>
            <Text style={styles.instructionItem}>
              • Words less than 3 letters will not be accepted
            </Text>
            <Text style={styles.instructionItem}>
              • Cannot use any other letter other than on dice.
            </Text>
          </View>
        </View>

        <View style={styles.diceContainer}>
          {randomLetters &&
            randomLetters.map((letter, index) => (
              <View key={index} style={styles.diceButton}>
                <Text style={styles.diceText}>{letter}</Text>
              </View>
            ))}
        </View>

        {/* OTP Input Boxes */}
        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              maxLength={1}
              value={value}
              onChangeText={(text) => handleInputChange(index, text)}
              keyboardType="default"
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(index, { nativeEvent })
              }
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </View>

        {/* Enter Button */}
        <TouchableOpacity
          style={[
            styles.enterButton,
            (otp.filter((letter) => letter !== "").length < 3 ||
              otp.some(
                (letter) => letter && !randomLetters.includes(letter)
              )) &&
              styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={
            otp.filter((letter) => letter !== "").length < 3 ||
            otp.some((letter) => letter && !randomLetters.includes(letter))
          }
        >
          <Text style={styles.enterButtonText}>ENTER</Text>
        </TouchableOpacity>

        {/* Your Words Section */}
        <View style={styles.yourWordsContainer}>
          <Text style={styles.yourWordsTitle}>Your Words</Text>
          <View style={styles.wordsGrid}>
          {submittedWords.map((word, index) => (
  <View key={index} style={styles.wordBox}>
    
    {isCommonWord(word) ? (
        <FontAwesome name="check-circle" size={24} color="green" />
      ) : (
        <FontAwesome name="times-circle" size={24} color="red" />
      )} 
      <Text style={styles.wordText}>
     
      
     {word}
   </Text>
  </View>
))}
          </View>
        </View>
      </ScrollView>
    </WrapperComponent>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-around", // Center the content vertically
    alignItems: "center", // Center the content horizontally
    paddingBottom: 30, // Add space at the bottom to prevent cutting off content
  },
  diceContainer: {
    flexDirection: "row", // Arrange buttons in a row
    justifyContent: "center", // Distribute space evenly
    width: "100%", // Control the width of the dice area
    marginVertical: 20, // Add space above and below
    gap: 10 ,
  },
  diceButton: {
    width: 50,
    height: 50,
    
    backgroundColor: "navy",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 10,
  },
  diceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "#aaa",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  otpContainer: {
    flexDirection: "row", // Arrange inputs in a row
    gap: 10,
    justifyContent: "center", // Space them out evenly
    width: "100%", // Control the width of the OTP area
    marginVertical: 20, // Adds space above and below
  },
  otpInput: {
    width: 50, // Width of each input box
    height: 50, // Height of each input box
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
    backgroundColor: "white",
  },
  enterButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    width: "60%",
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  enterButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  yourWordsContainer: {
    marginTop: 30, // Space above the "Your Words" section
    alignItems: "center",
    width: "80%", // Restrict the width for better formatting
  },
  yourWordsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  wordsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Distribute words with spacing between them
    gap: 10, // Add a gap between both columns and rows
  },
  wordBox: {
    width: 100, // Each word takes 30% of the row (for 3-column grid)
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent : "center" ,
    borderRadius: 8,
    gap : 5 ,
    flexDirection : 'row' ,
    

  },
  wordText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  instructionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  instructionsList: {
    marginLeft: 20, // Optional: to indent the instructions
  },
  instructionItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  disabledButton: {
    backgroundColor: "gray", // Visually indicate that the button is disabled
  },
});

export default GamePage;
