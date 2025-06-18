import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

export default function App() {
  const [text, setText] = React.useState("");

  const handleConvert = () => {
    console.log(text);
    setText("");
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
