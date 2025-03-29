// RecipeGenerator.js - Updated styling
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import GlobalApi from "@/services/GlobalApi";
import Prompt from "@/services/Prompt"; // Fixed import

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const OnGenerate = async () => {
    if (!ingredients.trim()) {
      alert("Please enter ingredients");
      return;
    }

    setLoading(true); // Start loading
    try {
      const promptText = `${ingredients} ${Prompt.GENERATE_OPTION_PROMPT}`;
      const result = await GlobalApi.AImodel(promptText);
      console.log("AI Response:", result?.choices[0].message); // Handle response here
    } catch (error) {
      console.error("Error generating recipe:", error);
      alert("Failed to generate recipe. Try again!");
    } finally {
      setLoading(false); // Stop loading
    }
  };

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
        style={[styles.button, loading && styles.disabledButton]}
        onPress={OnGenerate}
        disabled={loading}
      >
        <Ionicons
          name={loading ? "sync" : "sparkles"}
          size={20}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>
          {loading ? "Generating..." : "Generate Recipe"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerIcon: {
    marginRight: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    height: 90,
    textAlignVertical: "top",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#FF9800",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#FFA726",
    opacity: 0.7,
  },
});
