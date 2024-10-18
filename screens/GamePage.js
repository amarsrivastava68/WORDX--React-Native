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
  Pressable,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import WrapperComponent from "../components/Wrapper";
import { UserContext, actionTypes } from "../context/userContext";
import { SettingsContext } from "../context/settingsContext";
const GamePage = ({ route, navigation }) => {
  const { randomLetters } = route.params;
  const [wordsGrid, setWordsGrid] = useState(["", "", "", "", "", ""]);
  const [submittedWords, setSubmittedWords] = useState([]); // Store entered words
  const inputRefs = useRef([]);
  const { dispatch, state } = useContext(UserContext);
  const { settingsState :{isDarkMode} } = useContext(SettingsContext); 

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
    const newwordsGrid = [...wordsGrid];
    newwordsGrid[index] = value.toUpperCase();
    setWordsGrid(newwordsGrid);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === "Backspace" && wordsGrid[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = () => {
    const enteredString = wordsGrid.join("");
    if (enteredString.trim()) {
      setSubmittedWords((prev) => {
        if (!prev.includes(enteredString)) {
          const updatedWords = [...prev, enteredString];
          
          if (isCommonWord(enteredString)) {
            dispatch({ type: actionTypes.SET_VALID_WORDS, payload: enteredString });
          }
          
          return updatedWords;
        } else {
          Alert.alert("Duplicate Entry", "This word has already been submitted.");
          return prev;
        }
      });
  
      setWordsGrid(["", "", "", "", "", ""]);
      inputRefs.current[0].focus();
    }
  };
  

  return (
    <WrapperComponent timer={true} navigation={navigation}>
      <ScrollView contentContainerStyle={styles(isDarkMode).scrollContainer}>
        <View>
          <Text style={styles(isDarkMode).instructionText}>Player Instructions:</Text>
          <View style={styles(isDarkMode).instructionsList}>
            <Text style={styles(isDarkMode).instructionItem}>
              • Words less than 3 letters will not be accepted
            </Text>
            <Text style={styles(isDarkMode).instructionItem}>
              • Cannot use any other letter other than on dice.
            </Text>
          </View>
        </View>

        <View style={styles(isDarkMode).diceContainer}>
          {randomLetters &&
            randomLetters.map((letter, index) => (
              <View key={index} style={styles(isDarkMode).diceButton}>
                <Text style={styles(isDarkMode).diceText}>{letter}</Text>
              </View>
            ))}
        </View>

        {/* wordsGrid Input Boxes */}
        <View style={styles(isDarkMode).wordsGridContainer}>
          {wordsGrid.map((value, index) => (
            <TextInput
              key={index}
              style={styles(isDarkMode).wordsGridInput}
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
        <Pressable
          style={[
            styles(isDarkMode).enterButton,
            (wordsGrid.filter((letter) => letter !== "").length < 3 ||
              wordsGrid.some(
                (letter) => letter && !randomLetters.includes(letter)
              )) &&
              styles(isDarkMode).disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={
            wordsGrid.filter((letter) => letter !== "").length < 3 ||
            wordsGrid.some((letter) => letter && !randomLetters.includes(letter))
          }
        >
          <Text style={styles(isDarkMode).enterButtonText}>ENTER</Text>
        </Pressable>

        {/*  Words Section */}
        <View style={styles(isDarkMode).yourWordsContainer}>
          <Text style={styles(isDarkMode).yourWordsTitle}>Your Words</Text>
          <View style={styles(isDarkMode).wordsGrid}>
            {submittedWords.map((word, index) => (
              <View key={index} style={styles(isDarkMode).wordBox}>
                {isCommonWord(word) ? (
                  <FontAwesome name="check-circle" size={24} color="green" />
                ) : (
                  <FontAwesome name="times-circle" size={24} color="red" />
                )}
                <Text style={styles(isDarkMode).wordText}>{word}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </WrapperComponent>
  );
};

const styles = (isDarkMode) => StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 30,
    backgroundColor: isDarkMode ? "black" : "white",
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
  wordsGridContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
  },
  wordsGridInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: isDarkMode ? "lightgray" : "black",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
    backgroundColor: isDarkMode ? "gray" : "white",
    color: isDarkMode ? "white" : "black",
  },
  enterButton: {
    backgroundColor: isDarkMode ? "#0056b3" : "#007BFF",
    padding: 15,
    borderRadius: 10,
    width: "60%",
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",

    
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
    color: isDarkMode ? "white" : "black",
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
    backgroundColor: isDarkMode ? "#303030" : "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    gap: 5,
    flexDirection: "row",
  },
  wordText: {
    fontSize: 16,
    fontWeight: "bold",
    color: isDarkMode ? "white" : "black",
  },
  instructionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: isDarkMode ? "white" : "black",
  },
  instructionsList: {
    marginLeft: 20,
  },
  instructionItem: {
    fontSize: 16,
    marginBottom: 5,
    color: isDarkMode ? "white" : "black",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
});

export default GamePage;
