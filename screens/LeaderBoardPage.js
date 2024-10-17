import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import WrapperComponent from '../components/Wrapper';
import { UserContext } from "../context/userContext";
import dummyUsers from '../utils/dummy-users.json';

const LeaderBoardPage = ({ navigation }) => {
  const [users, setUsers] = useState(dummyUsers);
  const {state : { userName, score} } = useContext(UserContext);

  const sortedUsers = [...users, { name: userName, score: score }].sort((a, b) => b.score - a.score);

  const buttons = [
    {
      label: "BACK",
      onPress: () => { navigation.navigate("ResultPage") },
    },
    {
      label: "NEXT",
      onPress: () => { navigation.navigate("LastPage") },
    },
  ];

  return (
    <WrapperComponent
      onVolumePress={() => alert("Volume")}
      onDarkModePress={() => alert("Dark Mode")}
      timer={false}
      buttons={buttons}
    >
      <View style={styles.LeaderBoardContainer}>
        {sortedUsers.map((user, index) => (
          <View key={index} style={styles.userContainer}>
            <Text style={styles.rank}>0{index + 1}</Text>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.score}>{user.score}</Text>
          </View>
        ))}
      </View>

      <View style={styles.statisticsContainer}>
        <Text style={styles.statisticsHeading}>STATISTICS</Text>
        <View style={styles.blockRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statText}>Games Played</Text>
            <Text style={styles.statValue}>10</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statText}>Highest Score</Text>
            <Text style={styles.statValue}>1500</Text>
          </View>
        </View>
        <View style={styles.blockRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statText}>Average Score</Text>
            <Text style={styles.statValue}>900</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statText}>Lowest Score</Text>
            <Text style={styles.statValue}>300</Text>
          </View>
        </View>
      </View>
    </WrapperComponent>
  );
};

const styles = StyleSheet.create({
  LeaderBoardContainer: {
    padding: 10,
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '100%',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  score: {
    fontSize: 16,
    textAlign: 'right',
  },
  statisticsContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  statisticsHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  blockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  statBlock: {
    backgroundColor: 'navy',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    marginBottom: 10,
    marginTop: 10,


  },
  statText: {
    fontSize: 14,
    color: '#FFD700', 
    textAlign: 'center',
    fontWeight: 'bold', 
  },

  
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LeaderBoardPage;
