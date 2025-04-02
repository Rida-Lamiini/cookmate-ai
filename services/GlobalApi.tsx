import { supabase } from "@/utils/SupabaseConfig";
import axios from "axios";
import OpenAI from "openai";

// Initialize OpenAI with OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey:
    "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",
});

// ✅ Get user by email
const GetUserByEmail = async (email: string) => {
  console.log("Fetching user by email:", email);
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      console.warn("User not found, might need to create.");
      return null;
    }

    console.log("User data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

// ✅ Create a new user
const CreateUser = async (userData: {
  email: string;
  name: string;
  picture: string;
}) => {
  console.log("Creating new user:", userData);
  try {
    const { data, error } = await supabase.from("users").insert([userData]);

    if (error) {
      console.error("Error creating user:", error);
      return null;
    }

    console.log("User created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

// ✅ Get all categories
const GetCategories = async () => {
  console.log("Fetching categories...");
  try {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      console.error("Error fetching categories:", error);
      return null;
    }

    console.log("Categories fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

// ✅ AI Model API (OpenAI)
const AImodel = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-lite-001",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    console.log("AI Response:", response);
    return response;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return null;
  }
};
const BASE_URL = "https://aigurulab.tech";
const GenerateAiImage = async (input: string) => {
  try {
    const response = await axios.post(
      BASE_URL + "/api/generate-image",
      {
        width: 1024,
        height: 1024,
        input: input,
        model: "sdxl", //'flux'  // You can toggle this depending on the model you want to use
        aspectRatio: "1:1", // Applicable to Flux model only
      },
      {
        headers: {
          "x-api-key": process.env.EXPO_PUBLIC_AIGURULAB_API_KEY, // Your API Key
          "Content-Type": "application/json", // Content Type
        },
      }
    );

    console.log("AI Image Generated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error generating AI image:", error);
    return null;
  }
};

// ✅ Save Recipe to Database
const SaveRecipeToDb = async (recipeData, user_email, imageUrl) => {
  console.log("Saving recipe to database:", recipeData);
  console.log("User email:", user_email);
  console.log("Image URL:", imageUrl);

  if (!recipeData?.user_email) {
    console.error("No user email provided");
    return { success: false, message: "User not logged in!" };
  }

  try {
    const { data, error } = await supabase.from("complete_recipes").insert([
      {
        user_email: recipeData.user_email,
        recipe_name: recipeData.recipeName,
        description: recipeData.description,
        ingredients: recipeData.ingredients,
        steps: recipeData.steps,
        calories: recipeData.calories,
        cook_time: recipeData.cookTime,
        serve_to: recipeData.serveTo,
        image_prompt: recipeData.imagePrompt,
        image_url: recipeData.imageUrl,
      },
    ]);

    if (error) {
      console.error("Error saving recipe:", error);
      return { success: false, message: "Failed to save recipe. Try again!" };
    }

    console.log("Recipe saved successfully:", data);
    return { success: true, message: "Recipe saved successfully!" };
  } catch (error) {
    console.error("Unexpected error while saving recipe:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Try again!",
    };
  }
};
// ✅ Get recipes by category name (with NOT condition)
const GetRecipesByCategory = async (categoryName: string) => {
  console.log("Fetching recipes excluding category:", categoryName);

  try {
    const { data, error } = await supabase.from("complete_recipes").select("*");

    if (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }

    // Filter recipes where the category is NOT the provided categoryName
    const filteredRecipes = data.filter((item) => {
      try {
        // Parse categories if it's a JSON string
        const categories = JSON.parse(item.categories);

        // Check if categories is an array and if it includes the category name (case insensitive)
        return (
          Array.isArray(categories) &&
          categories.some(
            (category) => category.toLowerCase() === categoryName.toLowerCase()
          )
        );
      } catch (error) {
        console.error("Error parsing categories:", error);
        return false;
      }
    });
    console.log(filteredRecipes);

    // Log filtered recipes
    filteredRecipes.forEach((item) => {
      console.log(
        `${item.recipe_name} does NOT belong to category: ${categoryName}`
      );
    });

    console.log("Recipes fetched successfully:", filteredRecipes);
    return filteredRecipes;
  } catch (error) {
    console.error("Unexpected error fetching recipes:", error);
    return [];
  }
};

// ✅ Export the new function
const GlobalApi = {
  GetUserByEmail,
  CreateUser,
  GetCategories,
  GetRecipesByCategory, // Added this function
  AImodel,
  GenerateAiImage,
  SaveRecipeToDb,
};

export default GlobalApi;
