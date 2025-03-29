import { supabase } from "@/utils/SupabaseConfig";
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
    });

    console.log("AI Response:", response);
    return response;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return null;
  }
};

// ✅ Export all API functions
const GlobalApi = {
  GetUserByEmail,
  CreateUser,
  GetCategories,
  AImodel,
};

export default GlobalApi;
