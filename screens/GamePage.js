import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { isCommonWord } from "../utils/ValidityChecker";
import { FontAwesome } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import WrapperComponent from "../components/Wrapper";
import { UserContext, actionTypes } from "../context/userContext";

const GamePage = ({ route, navigation }) => {
  const { randomLetters } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [submittedWords, setSubmittedWords] = useState([]); // Store entered words
  const inputRefs = useRef([]);
  const { dispatch  , state} = useContext(UserContext);

  useEffect(() => {
    setSubmittedWords([]);
    dispatch({ type: actionTypes.RESET_VALID_WORDS });

  }, []);

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
              style: "cancel",
            },
            { text: "YES", onPress: () => navigation.goBack() },
          ]
        );
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.toUpperCase();
    setOtp(newOtp);

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
      setSubmittedWords((prev) => [...prev, enteredString]); 
      if (isCommonWord(enteredString)) {
        dispatch({ type: actionTypes.SET_VALID_WORDS, payload: enteredString }); 
      }
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
    }
  };

  return (
    <WrapperComponent
      onVolumePress={() => alert("Volume")}
      onDarkModePress={() => alert("Dark Mode")}
      timer={true}
      navigation={navigation}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
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

        {/*  Words Section */}
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
                <Text style={styles.wordText}>{word}</Text>
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
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 30,
  },
  diceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
    gap: 10,
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
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
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
    marginTop: 30,
    alignItems: "center",
    width: "80%",
  },
  yourWordsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  wordsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  wordBox: {
    width: 100,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    gap: 5,
    flexDirection: "row",
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
    marginLeft: 20,
  },
  instructionItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});

export default GamePage;
