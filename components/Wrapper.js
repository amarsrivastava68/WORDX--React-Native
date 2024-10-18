import React from "react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import {
  SettingsContext,
  settingsActionTypes,
} from "../context/settingsContext";
import {
  Alert,
  View,
  Pressable,
  Text,
  StyleSheet,
  
  Platform,
  StatusBar,
  Image,
  SafeAreaView,
} from "react-native";

const WrapperComponent = ({ children, timer, buttons, navigation }) => {
  const [countdown, setCountdown] = useState(60);
  const {
    state: { score },
  } = useContext(UserContext);
  const {
    settingsState: { isDarkMode, isMuted },
    settingsDispatch,
  } = useContext(SettingsContext);
  useEffect(() => {
    let interval;
    if (timer) {
      setCountdown(60);
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);

            setTimeout(() => {
              navigation.navigate("ResultPage");
            }, 500);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Row with Volume, Timer, and Points */}
      <View style={styles.topRow}>
        {/* Volume and Dark Mode Icons */}
        <View style={styles.iconContainer}>
          <Pressable
            onPress={() => {
              Alert.alert("Mute State", `Mute State - ${!isMuted}`);
              settingsDispatch({ type: settingsActionTypes.TOGGLE_MUTE });
            }}
            style={styles.iconWrapper}
          >
         { !isMuted &&  <Image
              source={require(`../assets/volume-icon.png`)}
              style={styles.icon}
            />}
             { isMuted &&  <Image
              source={require(`../assets/mute.png`)}
              style={styles.icon}
            />}

          </Pressable>
          <Pressable
            onPress={() => {

              settingsDispatch({ type: settingsActionTypes.TOGGLE_DARK_MODE });
            }}
            style={styles.iconWrapper}
          >
           {!isDarkMode && <Image
              source={require("../assets/dark-mode-icon.png")}
              style={styles.icon}
            />} 
            {isDarkMode && <Image
              source={require("../assets/bulb.png")}
              style={styles.icon}
            />} 
          </Pressable>
        </View>

        {/* Timer in the middle */}
        {timer && (
          <View style={styles.timerContainer}>
            <Text style={[styles.timerText, { color: "black", marginTop: 0 }]}>
              {countdown} s
            </Text>
          </View>
        )}

        {/* Points Indicator */}
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>{score} </Text>
          <Image source={require("../assets/star.png")} style={styles.icon} />
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>{children}</View>

      {/* Bottom Buttons */}
      <View style={styles.bottomRow}>
        {timer && (
          <View style={[styles.timerBottomContainer, { flexDirection: "col" }]}>
            <Image
              source={require("../assets/sand-clock-icon.png")} 
              style={styles.timerIcon}
            />
            <Text style={styles.timerText}>{countdown}s</Text>
          </View>
        )}

{!timer &&
  buttons.map((button, index) => (
    <Pressable
      key={index}
      onPress={button.onPress}
      style={({ pressed }) => [
        styles.button, 
        pressed && styles.buttonPressed 
      ]}
    >
      <Text style={styles.buttonText}>{button.label}</Text>
    </Pressable>
  ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "navy",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightgray",
  },
  iconContainer: {
    flexDirection: "row",
    width: 80,
    gap: 8,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#d549d6",
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 4,

    borderColor: "navy",
  },
  scoreWrapper: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 4,

    borderColor: "navy",
  },
  icon: {
    width: 20,
    padding: 5,
    height: 20,
  },
  timerContainer: {
    flex: 1,
    alignItems: "center",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  pointsContainer: {
    alignItems: "flex-end",
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: "skyblue",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 4,

    borderColor: "navy",
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contentWrapper: {
    backgroundColor: "navy",
    padding: 10,
  },
  mainContent: {
    flex: 7,
    backgroundColor: "white",
    borderRadius: 80,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    overflow: "hidden",
    
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "space-around",
    padding: 10,
    flex: 1,
    backgroundColor: "navy",
  },
  button: {
    backgroundColor: "#007BFF", 
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, 
  },
  buttonPressed: {
    backgroundColor: "#0056b3", 
    transform: [{ scale: 0.95 }], 
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  timerContainer: {
    alignItems: "center",
  },
  timerIcon: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  timerText: {
    fontSize: 30,
    marginTop: 2,
    color: "white",
    fontWeight: "bold",
  },
  timerBottomContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default WrapperComponent;
