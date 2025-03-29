import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="restaurant"
          size={24}
          color="#FF9800"
          style={styles.headerIcon}
        />
        <Text style={styles.header}>Recipe Generator</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter ingredients (e.g., chicken, rice, tomatoes)"
          value={ingredients}
          onChangeText={setIngredients}
          multiline={true}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => alert(`Generating recipes with: ${ingredients}`)}
      >
        <Ionicons
          name="sparkles"
          size={20}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Generate Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    marginRight: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    height: 100, // Set fixed height
    textAlignVertical: "top",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#FF9800",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
