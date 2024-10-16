import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  BackHandler,
} from "react-native";
import WrapperComponent from "../components/Wrapper"; // Assuming the WrapperComponent is located here
import RollDicePage from "./RollDicePage";

const ResultPage = ({ navigation }) => {
  const { validWords, setScore } = useContext(UserContext);

  const lettersGrid = validWords.map((word) => {
    const letters = word.split("");
    return [...letters, ...Array(6 - letters.length).fill("")];
  });

  const points = validWords.length * 3;

  const buttons = [
    {
      label: "Play Again",
      onPress: () => {
        navigation.navigate("RollDicePage");
      }, // Navigate to RollDicePage on Play Again button press
    },
    {
      label: "NEXT",
      onPress: () => {},
    },
  ];

  useEffect(() => {
    if (validWords && validWords.length > 0) {
      setScore((prev) => prev + validWords.length * 3);
    }

    const handleBackPress = () => {
      return true; 
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, [validWords]);

  return (
    <WrapperComponent
      onVolumePress={() => alert("Volume")} 
      onDarkModePress={() => alert("Dark Mode")} 
      timer={false} 
      buttons={buttons}
    >
      <View style={styles.container}>
        {/* Grid of letters */}
        <FlatList
          data={lettersGrid}
          renderItem={({ item }) => (
            <View style={styles.row}>
              {item.map((letter, index) => (
                <View
                  key={index}
                  style={[
                    styles.letterBox,
                    { backgroundColor: letter !== "" ? "#28a745" : "white" },
                  ]}
                >
                  <Text style={styles.letterText}>{letter}</Text>
                </View>
              ))}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.grid}
        />

        {/* Banner with points */}
        <View style={styles.bannerContainer}>
          <Image
            source={require("../assets/banner.png")}
            style={styles.bannerImage}
          />
          <Text style={styles.bannerText}>You have won {points} points!</Text>
        </View>
      </View>
    </WrapperComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f9f9f9", 
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 5, 
  },
  letterText: {
    color: "white",
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
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ResultPage;
