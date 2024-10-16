import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import WrapperComponent from "../components/Wrapper"; // Assuming the WrapperComponent is located here

const ResultPage = () => {
  const {validWords} = useContext(UserContext)

  // Create a 2D array for the letters, filling empty spaces to have 6 columns
  const lettersGrid = validWords.map((word) => {
    const letters = word.split("");
    // Fill with empty strings to ensure each row has 6 columns
    return [...letters, ...Array(6 - letters.length).fill("")];
  });

  // Calculate points
  const points = validWords.length * 3;

  // Prepare buttons
  const buttons = [
    {
      label: "NEXT",
      onPress: () => {}, // Trigger shake on button press
    },
  ];

  return (
    <WrapperComponent
      points={0} // Points can be customized based on your game logic
      onVolumePress={() => alert("Volume")} // Placeholder for volume button
      onDarkModePress={() => alert("Dark Mode")} // Placeholder for dark mode button
      timer={false} // Disable timer for this page
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
                    { backgroundColor: letter !== "" ? "#28a745" : "white" }, // Change background color based on the letter
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
            source={require("../assets/banner.png")} // Adjust the path as needed
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
    backgroundColor: "#f9f9f9", // Light background color
  },
  grid: {
    justifyContent: "center", // Center the grid content
    marginBottom: 20, // Space below the grid
  },
  row: {
    flexDirection: "row", // Display letters in a row
    justifyContent: "center", // Center the letters
    marginBottom: 10, // Space between rows
  },
  letterBox: {
    width: 50, // Set width of each box (adjust as needed)
    height: 50, // Set height of each box
    justifyContent: "center",
    alignItems: "center",
    margin: 5, // Margin between boxes
    borderRadius: 8,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.2, // iOS shadow
    shadowRadius: 5, // iOS shadow
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
    height: 250, // Adjust as needed
    width : 440 ,
    resizeMode: "cover", // Make sure the image covers the area
    position: "relative",
  },
  bannerText: {
    position: "absolute",
    bottom: 105, // Position the text near the bottom of the image
    left: 10,
    right: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ResultPage;
