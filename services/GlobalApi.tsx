import { supabase } from "@/utils/SupabaseConfig";
import axios from "axios";
import OpenAI from "openai";

// Initialize OpenAI with OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUT_API_KEY,
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

// ✅ Export all API functions
const GlobalApi = {
  GetUserByEmail,
  CreateUser,
  GetCategories,
  AImodel,
  GenerateAiImage,
};

export default GlobalApi;
