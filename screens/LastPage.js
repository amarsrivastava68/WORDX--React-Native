import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  BackHandler,
} from "react-native";
import WrapperComponent from "../components/Wrapper";
import { UserContext  , actionTypes} from "../context/userContext";

const LastPage = ({ navigation }) => {
    const {state : { userName} , dispatch } = useContext(UserContext);
    const [newName, setNewName] = useState("");

  const buttons = [
    {
      label: "BACK",
      onPress: () => {
        navigation.navigate("LeaderBoardPage");
      },
    },
    {
      label: "QUIT",
      onPress: () => {
        BackHandler.exitApp();
      },
    },
  ];

  return (
    <WrapperComponent
      onVolumePress={() => alert("Volume")}
      onDarkModePress={() => alert("Dark Mode")}
      timer={false}
      buttons={buttons}
    >
      <View style={styles.topSection}>
        <Text style={styles.username}>{userName}</Text>
        <TextInput
          style={styles.input}
          placeholder="Update Name"
          value={newName}
          onChangeText={setNewName}
        />
        <Pressable
          style={styles.updateButton}
          onPress={() => {
            dispatch({type : actionTypes.SET_USER_NAME , payload : newName});
            alert(`Name updated to: ${newName}`);
            setNewName("");
          }}
        >
          <Text style={styles.updateButtonText}>Update</Text>
        </Pressable>
      </View>

      <View style={styles.statisticsContainer}>
        <Text style={styles.statisticsHeading}>STATISTICS</Text>
        <View style={styles.statBlock}>
          <Text style={styles.statText}>Games Played</Text>
          <Text style={styles.statValue}>10 matches</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statText}>Highest Score</Text>
          <Text style={styles.statValue}>1500 points</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statText}>Average Score</Text>
          <Text style={styles.statValue}>900 points</Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statText}>Lowest Score</Text>
          <Text style={styles.statValue}>300 points</Text>
        </View>
      </View>
    </WrapperComponent>
  );
};

const styles = StyleSheet.create({
  topSection: {
    alignItems: "flex-start", // Align items to the left
    marginBottom: 10,
    padding: 30,
    width: "100%", // Set a fixed width for consistency
    alignSelf: "center", // Center the top section
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius : 5 
  },
  updateButton: {
    backgroundColor: "navy", // Navy background for the button
    padding: 10,
    borderRadius: 5,
    alignItems: "center", // Center the text within the button
    width: "auto", // Set the button width to match the input
  },
  updateButtonText: {
    color: "#fff", // Text color
    fontWeight: "bold",
  },
  statisticsContainer: {
    marginTop: 20,
    
    padding: 30,
    alignItems: "center",
    width: "100%", 
    alignSelf: "center", 
  },
  statisticsHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  statBlock: {
    backgroundColor: "navy",
    flexDirection: "row",
    justifyContent : 'space-between' ,
    padding: 25,
    borderRadius: 10,
    width: "100%", // Set the width of the statistic blocks to fill the container
    marginBottom: 15,
    alignItems: "center",
  },
  statText: {
    fontSize: 14,
    color: "#FFD700",
    textAlign: "center",
    fontWeight: "bold",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    
  },
});

export default LastPage;
