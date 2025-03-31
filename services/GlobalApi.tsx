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

// ✅ Export all API functions
const GlobalApi = {
  GetUserByEmail,
  CreateUser,
  GetCategories,
  AImodel,
  GenerateAiImage,
  SaveRecipeToDb,
};

export default GlobalApi;
