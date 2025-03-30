import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import GlobalApi from "@/services/GlobalApi";
import Prompt from "@/services/Prompt";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import LoadingDialog from "./LoadingDIalog";

export default function RecipeGenerator() {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [recipeOptions, setRecipeOptions] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);

  const OnGenerate = async () => {
    if (!ingredients.trim()) {
      alert("Please enter ingredients");
      return;
    }

    setLoading(true);
    try {
      const promptText = `${ingredients} ${Prompt.GENERATE_OPTION_PROMPT}`;
      const result = await GlobalApi.AImodel(promptText);

      // Check if the response is valid
      if (result?.choices[0].message.content) {
        const options = JSON.parse(result?.choices[0].message.content);
        setRecipeOptions(options);
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      alert("Failed to generate recipe. Try again!");
    } finally {
      setLoading(false);
    }
    actionSheetRef.current?.show();
  };

  const GenerateCompleteRecipe = async (recipe) => {
    actionSheetRef.current?.hide();
    setOpenLoading(true);

    try {
      const promptText = `${recipe} ${Prompt.GENERATE_COMPLETE_RECIPE}`;
      const result = await GlobalApi.AImodel(promptText);
      const option = JSON.parse(result?.choices[0].message.content);
      // console.log("Complete Recipe Response:", option);
      console.log("image Recipe Response:", option[0].imagePrompt);

      await GenerateRecipeImage(option[0].imagePrompt);
    } catch (error) {
      console.error("Error generating complete recipe:", error);
      alert("Failed to generate complete recipe. Try again!");
    } finally {
      setOpenLoading(false);
    }
  };

  const GenerateRecipeImage = async (imagePrompt) => {
    try {
      const result = await GlobalApi.GenerateAiImage(imagePrompt);
      console.log("Generated Image URL:", result.image);
      // You can display the image here using the URL or save it for later.
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Try again!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="restaurant"
          size={24}
          color="#4a4aff"
          style={styles.headerIcon}
        />
        <Text style={styles.header}>Recipe Generator</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter ingredients (e.g., chicken, rice, tomatoes)"
          placeholderTextColor="#999999"
          value={ingredients}
          onChangeText={setIngredients}
          multiline={true}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={OnGenerate}
        disabled={loading}
        activeOpacity={0.8}
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

      <LoadingDialog visible={openLoading} text="Generating your recipe..." />

      <ActionSheet
        ref={actionSheetRef}
        containerStyle={styles.actionSheetContainer}
        indicatorStyle={styles.actionSheetIndicator}
      >
        <ScrollView style={styles.actionSheetContent}>
          <Text style={styles.actionSheetTitle}>Select a Recipe</Text>
          {recipeOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => GenerateCompleteRecipe(option.recipeName)}
              style={styles.recipeOption}
            >
              <Text style={styles.recipeName}>{option.recipeName}</Text>
              <Text style={styles.recipeDescription}>{option.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ActionSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerIcon: {
    marginRight: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#f8f8f8",
    color: "#333333",
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#4a4aff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4a4aff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#8080ff",
    opacity: 0.7,
  },
  actionSheetContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  actionSheetIndicator: {
    backgroundColor: "#cccccc",
    width: 60,
  },
  actionSheetContent: {
    padding: 20,
    maxHeight: 400,
  },
  actionSheetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333333",
    textAlign: "center",
  },
  recipeOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 14,
    color: "#666666",
  },
});
