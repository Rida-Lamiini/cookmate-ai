import { supabase } from "@/utils/SupabaseConfig";

// Function to get user by email
const GetUserByEmail = async (email: string) => {
  console.log("Fetching user by email:", email);

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      console.log("User not found, might need to create.");
      return null;
    }

    console.log("Response from Supabase:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    throw error;
  }
};

// Function to create a new user
const CreateUser = async (userData: {
  email: string;
  name: string;
  picture: string;
}) => {
  console.log("Creating new user:", userData);

  try {
    const { data, error } = await supabase.from("users").insert([userData]);

    if (error) {
      throw error;
    }

    console.log("User created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
};
const GetCategories = async () => {
  console.log("Fetching categories");

  try {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      console.error("Error fetching categories:", error.message);
      return null;
    }

    console.log("Categories fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};

// Export the functions
const GlobalApi = {
  GetUserByEmail,
  CreateUser,
  GetCategories, // Export the new API method
};

export default GlobalApi;
