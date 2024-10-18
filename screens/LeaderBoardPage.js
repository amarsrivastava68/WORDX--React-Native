import React, { useState, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import WrapperComponent from "../components/Wrapper";
import { UserContext } from "../context/userContext";
import dummyUsers from "../utils/dummy-users.json";
import { SettingsContext } from "../context/settingsContext";
const LeaderBoardPage = ({ navigation }) => {
  const [users, setUsers] = useState(dummyUsers);
  const { settingsState :{isDarkMode} } = useContext(SettingsContext); 

  const {
    state: { userName, score },
  } = useContext(UserContext);

  const sortedUsers = [...users, { name: userName, score: score }].sort(
    (a, b) => b.score - a.score
  );

  const buttons = [
    {
      label: "BACK",
      onPress: () => {
        navigation.navigate("ResultPage");
      },
    },
    {
      label: "NEXT",
      onPress: () => {
        navigation.navigate("LastPage");
      },
    },
  ];

  return (
    <WrapperComponent timer={false} buttons={buttons}>
      <View style = {styles(isDarkMode).container}>
      <View style={styles(isDarkMode).LeaderBoardContainer}>
        {sortedUsers.map((user, index) => (
          <View key={index} style={styles(isDarkMode).userContainer}>
            <Text style={styles(isDarkMode).rank}>0{index + 1}</Text>
            <Text style={styles(isDarkMode).name}>{user.name}</Text>
            <Text style={styles(isDarkMode).score}>{user.score}</Text>
          </View>
        ))}
      </View>

      <View style={styles(isDarkMode).statisticsContainer}>
        <Text style={styles(isDarkMode).statisticsHeading}>STATISTICS</Text>
        <View style={styles(isDarkMode).blockRow}>
          <View style={styles(isDarkMode).statBlock}>
            <Text style={styles(isDarkMode).statText}>Games Played</Text>
            <Text style={styles(isDarkMode).statValue}>10</Text>
          </View>
          <View style={styles(isDarkMode).statBlock}>
            <Text style={styles(isDarkMode).statText}>Highest Score</Text>
            <Text style={styles(isDarkMode).statValue}>1500</Text>
          </View>
        </View>
        <View style={styles(isDarkMode).blockRow}>
          <View style={styles(isDarkMode).statBlock}>
            <Text style={styles(isDarkMode).statText}>Average Score</Text>
            <Text style={styles(isDarkMode).statValue}>900</Text>
          </View>
          <View style={styles(isDarkMode).statBlock}>
            <Text style={styles(isDarkMode).statText}>Lowest Score</Text>
            <Text style={styles(isDarkMode).statValue}>300</Text>
          </View>
        </View>
      </View>
      </View>
    </WrapperComponent>
  );
};

const styles = (isDarkMode) =>
  StyleSheet.create({
    container : {
      backgroundColor: isDarkMode ? "black": "#fff",  
      flex: 1 
    },
    LeaderBoardContainer: {
      padding: 10,
      alignItems: "center",

    },
    userContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#333" : "#fff",
      paddingVertical: 15,
      paddingHorizontal: 15,
      marginBottom: 10,
      width: "100%",
      borderRadius: 10,
      elevation: 3,
      shadowColor: isDarkMode ? "#000" : "#aaa",
    },
    rank: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "left",
      color: isDarkMode ? "#f9f9f9" : "#000",  
    },
    name: {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      color: isDarkMode ? "#f9f9f9" : "#000",
    },
    score: {
      fontSize: 16,
      textAlign: "right",
      color: isDarkMode ? "#f9f9f9" : "#000",
    },
    statisticsContainer: {
      marginTop: 30,
      alignItems: "center",
    },
    statisticsHeading: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
      color: isDarkMode ? "#f9f9f9" : "#000",
    },
    blockRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 10,
    },
    statBlock: {
      backgroundColor: isDarkMode ? "#000080" : "navy",  
      padding: 15,
      borderRadius: 10,
      width: "45%",
      marginBottom: 10,
      marginTop: 10,
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
      color: isDarkMode ? "#f9f9f9" : "#fff", 
      textAlign: "center",
      marginTop: 10,
    },
  });

export default LeaderBoardPage;
