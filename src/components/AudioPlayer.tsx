import { View, Text } from "react-native";
import React from "react";
import { useAudioPlayer } from "expo-audio";

type AudioPlayerProps = {
  uri: string;
};

const AudioPlayer = ({ uri }: AudioPlayerProps) => {
  const player = useAudioPlayer({ uri });
  return (
    <View>
      <Text>AudioPlayer: {uri}</Text>
    </View>
  );
};

export default AudioPlayer;
