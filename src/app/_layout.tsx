import { Tabs } from "expo-router";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { View, Text } from "react-native";
import React from "react";

const RootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Text to Speech",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="file-audio-o" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="speech-to-text"
        options={{
          title: "Speech to Text",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="microphone" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
