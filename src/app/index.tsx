import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

export default function App() {
  const [text, setText] = React.useState("");

  const handleConvert = async () => {
    console.log("Starting conversion...");
    console.log(text, 44);
    const response = await fetch("/api/tts", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      throw new Error("Failed to fetch audio");
    }
    console.log(response);
    try {
      console.log("Saving audio file...");
      const arrayBuffer = await response.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      const fileUri =
        FileSystem.documentDirectory + new Date().toISOString() + ".mp3";
      console.log("File URI:", fileUri);
      await FileSystem.writeAsStringAsync(
        fileUri,
        Buffer.from(uint8Array).toString("base64"),
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );
    } catch (error) {
      console.error("Error occurred while saving audio file:", error);
    } finally {
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        placeholder="Enter text"
        onChangeText={setText}
        style={styles.input}
        multiline
      />
      <TouchableOpacity onPress={handleConvert} style={styles.button}>
        <Text style={styles.buttonText}>Convert to audio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
    paddingTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 10,
    padding: 10,
    minHeight: 50,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "royalblue",
    padding: 10,
    borderRadius: 10,
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
});
