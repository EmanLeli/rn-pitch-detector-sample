/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from "react-native";

import { Colors, Header } from "react-native/Libraries/NewAppScreen";
import { PitchDetector } from "react-native-pitch-detector";

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark";
  const [data, setData] = React.useState({ tone: "--", frequency: 0 });
  const [isRecording, setIsRecording] = React.useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const start = async () => {
    await PitchDetector.start();
    const status = await PitchDetector.isRecording();
    setIsRecording(status);
  };

  const stop = async () => {
    await PitchDetector.stop();
    const status = await PitchDetector.isRecording();
    setIsRecording(status);
  };

  React.useEffect(() => {
    PitchDetector.addListener(setData);
    return () => {
      PitchDetector.removeListener();
    };
  }, []);

  React.useEffect(() => {
    PitchDetector.addListener(setData);
    return () => {
      PitchDetector.removeListener();
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View style={styles.container}>
          <Text style={styles.tone}>{data?.tone}</Text>
          <Text style={styles.frequency}>{data?.frequency?.toFixed(1)}hz</Text>
          <Text
            style={[styles.status, { color: isRecording ? "green" : "red" }]}
          >
            {isRecording ? "ON" : "OFF"}
          </Text>
          <Button
            style={styles.button}
            onPress={isRecording ? stop : start}
            title={isRecording ? "STOP" : "START"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tone: {
    fontSize: 40,
    color: "black",
  },

  frequency: {
    fontSize: 20,
  },

  button: {
    marginTop: 20,
    backgroundColor: "black",
    width: "50%",
    minHeight: 50,
    borderRadius: 100,
    justifyContent: "center",
  },

  label: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },

  status: {
    marginTop: 16,
    color: "black",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

export default App;
