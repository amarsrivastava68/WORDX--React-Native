import React from 'react'
import { Text } from 'react-native'
import WrapperComponent from '../components/Wrapper';

const LastPage = ({navigation}) => {
    const buttons = [
        {
          label: "BACK",
          onPress: () => { navigation.navigate("LeaderBoardPage") },
        },
        {
          label: "QUIT",
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
     <Text>this is last page </Text> 
    </WrapperComponent>
  )
}

export default LastPage
