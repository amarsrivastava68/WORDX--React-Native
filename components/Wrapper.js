import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  SafeAreaView,
} from "react-native";

const WrapperComponent = ({
  children,
  points,
  timer,
  onVolumePress,
  onDarkModePress,
  buttons,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Row with Volume, Timer, and Points */}
      <View style={styles.topRow}>
        {/* Volume and Dark Mode Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onVolumePress} style={styles.iconWrapper}>
            <Image
              source={require("../assets/volume-icon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDarkModePress}
            style={styles.iconWrapper}
          >
            <Image
              source={require("../assets/dark-mode-icon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* Timer in the middle */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{timer}</Text>
        </View>

        {/* Points Indicator */}
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>
            {points}{" "}
            </Text>
            <Image
              source={require("../assets/star.png")}
              style={styles.icon}
            />
            
         
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>{children}</View>

      {/* Bottom Buttons */}
      <View style={styles.bottomRow}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={button.onPress}
          >
            <Text style={styles.buttonText}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "navy", // Change this to navy to match the footer
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
    backgroundColor: "lightpink",
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
    flexDirection : 'row' ,
    borderWidth: 4,

    borderColor: "navy",
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contentWrapper: {
    backgroundColor: "navy", // This ensures the space outside rounded corners is navy
    padding: 10, // Add padding here to create space between the edge and the white content
  },
  mainContent: {
    flex: 7,
    backgroundColor: "white",
    borderRadius: 80,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    overflow: "hidden",
    padding: 10, // Move padding here from contentWrapper
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default WrapperComponent;
