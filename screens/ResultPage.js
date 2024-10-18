import React, { useContext, useEffect } from "react";
import { UserContext, actionTypes } from "../context/userContext";
import { SettingsContext } from "../context/settingsContext";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  BackHandler,
} from "react-native";
import WrapperComponent from "../components/Wrapper";

const ResultPage = ({ navigation }) => {
  const { state, dispatch } = useContext(UserContext);
  const { settingsState :{isDarkMode} } = useContext(SettingsContext); 
  const lettersGrid = state.validWords?.map((word) => {
    const letters = word.split("");
    return [...letters, ...Array(6 - letters.length).fill("")];
  });

  const points = state.validWords ? state.validWords.length * 3 : 0;

  const buttons = [
    {
      label: "PLAY AGAIN",
      onPress: () => {
        navigation.navigate("RollDicePage");
      },
    },
    {
      label: "NEXT",
      onPress: () => {
        navigation.navigate("LeaderBoardPage");
      },
    },
  ];
  useEffect(() => {
    if (state.validWords && state.validWords.length > 0) {
      dispatch({
        type: actionTypes.SET_SCORE,
        payload: state.validWords.length * 3,
      });
    }

    const handleBackPress = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, [state.validWords]);

  return (
    <WrapperComponent timer={false} buttons={buttons}>
      {state.validWords.length === 0 && (
      <View style={styles(isDarkMode).noPointsContainer}>
        <Text style={styles(isDarkMode).noPointsText}>Better Luck Next Time!</Text>
        <Image
          source={require("../assets/sad.png")}
          style={styles(isDarkMode).noPointsImage}
        />
      </View>
    )}
      <View style={styles(isDarkMode).container}>
        {/* Grid of letters */}
        <FlatList
          data={lettersGrid}
          renderItem={({ item }) => (
            <View style={styles(isDarkMode).row}>
              {item.map((letter, index) => (
                <View
                  key={index}
                  style={[
                    styles(isDarkMode).letterBox,
                    { backgroundColor: letter !== "" ? "#28a745" : "white" },
                  ]}
                >
                  <Text style={styles(isDarkMode).letterText}>{letter}</Text>
                </View>
              ))}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles(isDarkMode).grid}
        />

        {/* Banner with points */}
        <View style={styles(isDarkMode).bannerContainer}>
          <Image
            source={require("../assets/banner.png")}
            style={styles(isDarkMode).bannerImage}
          />
          <Text style={styles(isDarkMode).bannerText}>You have won {points} points!</Text>
        </View>
      </View>
    </WrapperComponent>
  );
};

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: "center",
      backgroundColor: isDarkMode ? "black" : "#f9f9f9",
        },
    grid: {
      justifyContent: "center",
      marginBottom: 20,
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 10,
    },
    letterBox: {
      width: 50,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
      borderRadius: 8,
      elevation: 3,
      backgroundColor: isDarkMode ? "#333" : "#fff",
      shadowColor: isDarkMode ? "#000" : "#aaa", 
    },
    letterText: {
      color: isDarkMode ? "#f9f9f9" : "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    bannerContainer: {
      alignItems: "center",
    },
    bannerImage: {
      height: 250,
      width: 440,
      resizeMode: "cover",
      position: "relative",
    },
    bannerText: {
      position: "absolute",
      bottom: 105,
      left: 10,
      right: 10,
      color: isDarkMode ? "#f9f9f9" : "white", 
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    noPointsContainer: {
      alignItems: "center",
      
      backgroundColor: isDarkMode ?"black" : "#fff", 

    },
    noPointsText: {
      fontSize: 22,
      marginTop : 40 ,
      fontWeight: "bold",
      color: isDarkMode ? "#f9f9f9" : "#333",
      marginBottom: 30,
    },
    noPointsImage: {
      height: 200,
      width: 200,
      resizeMode: "contain",
      
    },
  });



export default ResultPage;
