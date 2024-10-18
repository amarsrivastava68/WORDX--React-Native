import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  BackHandler,
} from "react-native";
import { SettingsContext } from "../context/settingsContext";

import WrapperComponent from "../components/Wrapper";
import { UserContext, actionTypes } from "../context/userContext";

const LastPage = ({ navigation }) => {
  const {
    state: { userName },
    dispatch,
  } = useContext(UserContext);
  const [newName, setNewName] = useState("");
  const { settingsState :{isDarkMode} } = useContext(SettingsContext); 

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
    <WrapperComponent timer={false} buttons={buttons}>
            <ScrollView style = {styles(isDarkMode).container}>

      <View style={styles(isDarkMode).topSection}>
        <Text style={styles(isDarkMode).username}>{userName}</Text>
        <TextInput
          style={styles(isDarkMode).input}
          placeholder="Update Name"
          value={newName}
          onChangeText={setNewName}
        />
        <Pressable
          style={styles(isDarkMode).updateButton}
          onPress={() => {
            if(newName ==='')
            {
              alert('Name cannot be empty')
              return;
            }
            dispatch({ type: actionTypes.SET_USER_NAME, payload: newName });
            alert(`Name updated to: ${newName}`);
            setNewName("");
          }}
        >
          <Text style={styles(isDarkMode).updateButtonText}>Update</Text>
        </Pressable>
      </View>

      <View style={styles(isDarkMode).statisticsContainer}>
        <Text style={styles(isDarkMode).statisticsHeading}>STATISTICS</Text>
        <View style={styles(isDarkMode).statBlock}>
          <Text style={styles(isDarkMode).statText}>Games Played</Text>
          <Text style={styles(isDarkMode).statValue}>10 matches</Text>
        </View>
        <View style={styles(isDarkMode).statBlock}>
          <Text style={styles(isDarkMode).statText}>Highest Score</Text>
          <Text style={styles(isDarkMode).statValue}>1500 points</Text>
        </View>
        <View style={styles(isDarkMode).statBlock}>
          <Text style={styles(isDarkMode).statText}>Average Score</Text>
          <Text style={styles(isDarkMode).statValue}>900 points</Text>
        </View>
        <View style={styles(isDarkMode).statBlock}>
          <Text style={styles(isDarkMode).statText}>Lowest Score</Text>
          <Text style={styles(isDarkMode).statValue}>300 points</Text>
        </View>
      </View>
      </ScrollView>
    </WrapperComponent>
  );
};

const styles = (isDarkMode) =>
  StyleSheet.create({
    container : {
      backgroundColor: isDarkMode ? "black": "#fff",
      flex: 1 
    },
    topSection: {
      alignItems: "flex-start", 
      marginBottom: 10,
      padding: 30,
      width: "100%",
      alignSelf: "center", 
    },
    username: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
      color: isDarkMode ? "#f9f9f9" : "#000",
    },
    input: {
      height: 40,
      width : '100%',
      borderColor: isDarkMode ? "#777" : "gray", 
      borderWidth: 1,
      backgroundColor: isDarkMode ? "#333" : "#fff", 
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 5,
      color: isDarkMode ? "#f9f9f9" : "#000",
    },
    updateButton: {
      backgroundColor: isDarkMode ? "#000080" : "navy", 
      padding: 10,
      borderRadius: 5,
      alignItems: "center", 
      width: "auto",
    },
    updateButtonText: {
      color: "#fff", 
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
      color: isDarkMode ? "#f9f9f9" : "#000", 
    },
    statBlock: {
      backgroundColor: isDarkMode ? "#000080" : "navy", 
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 25,
      borderRadius: 10,
      width: "100%", 
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
