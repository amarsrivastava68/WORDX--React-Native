import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./screens/LandingPage"; // Your landing page component
import InfoPage from "./screens/InfoPage";
import RollDicePage from "./screens/RollDicePage";
import GamePage from "./screens/GamePage";
import ResultPage from "./screens/ResultPage";
import LeaderBoardPage from "./screens/LeaderBoardPage";
import LastPage from "./screens/LastPage";
import { UserProvider } from "./context/userContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LandingPage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="InfoPage" component={InfoPage} />
          <Stack.Screen name="RollDicePage" component={RollDicePage} />
          <Stack.Screen name="GamePage" component={GamePage} />
          <Stack.Screen name="ResultPage" component={ResultPage} />
          <Stack.Screen name="LeaderBoardPage" component={LeaderBoardPage} />
          <Stack.Screen name="LastPage" component={LastPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
