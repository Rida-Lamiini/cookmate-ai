export default {
  GENERATE_OPTION_PROMPT: `Depends on user instruction, create 3 different recipe variants with:
    - Recipe Name with Emoji 
    - 2-line description
    - Main ingredient list 
  
    Response should be in JSON format with:
    {
      recipeName: "Recipe Name 🍽️",
      description: "Short description",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"]
    }`,

  GENERATE_COMPLETE_RECIPE: `Based on the Recipe Name and Description, generate:
    - A complete list of ingredients (as "ingredients")
    - Emoji icons for each ingredient (as "icon")
    - Quantity of each ingredient (as "quantity")
    - Step-by-step recipe instructions (as "steps")
    - Total Calories (as "calories", only number)
    - Cooking time in minutes (as "cookTime")
    - Number of servings (as "serveTo")
    - A realistic image prompt for the recipe (as "imagePrompt")
  
    Response should be in JSON format only.`,
};
