import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { UserContext, actionTypes } from "../context/userContext";

export default function InfoPage({ navigation }) {
  const { dispatch } = useContext(UserContext);
  const [name, setName] = useState('');

  const handleGetStarted = () => {
    if (name.trim()) {
      dispatch({type:actionTypes.RESET_USER})
      dispatch({ type: actionTypes.SET_USER_NAME, payload: name });
      navigation.navigate("RollDicePage");
    }
    else{
      alert('Name cannot be empty')
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.outerCircle1}>
          <View style={styles.outerCircle2}>
            <View style={styles.outerCircle3}>
              <Image
                source={require("../assets/opened-book-3163 (5).png")}
                style={styles.icon}
              />
              <Text style={styles.brandName}>WORDX</Text>
            </View>
          </View>
        </View>

        <View style={styles.newSection}>
          <Text style={styles.paragraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName} 
          />
          <Pressable style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>GET STARTED</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
  },
  
  outerCircle1: {
    borderColor: "rgba(0, 0, 0, 0.1)", 
    borderWidth: 3, 
    borderRadius: 175, 
    width: 350, 
    height: 350,
    alignItems: "center",
    justifyContent: "center",
    margin: 20, 
  },
  outerCircle2: {
    borderColor: "rgba(0, 0, 0, 0.5)", 
    borderWidth: 3,
    borderRadius: 150,
    width: 300, 
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    margin: 30, 
  },
  outerCircle3: {
    borderColor: "black",
    borderWidth: 3, 
    borderRadius: 125,
    width: 250, 
    height: 250, 
    alignItems: "center",
    justifyContent: "center",
    margin: 40, 
  },
  icon: {
    width: 100, 
    height: 100, 
    marginBottom: 10, 
  },
  brandName: {
    fontSize: 50,
    color: "black",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  newSection: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 20,
  },
  paragraph: {
    fontSize: 20,
    textAlign: "left",
    marginBottom: 15, 
  },
  inputField: {
    width: "100%", 
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15, 
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
   
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
