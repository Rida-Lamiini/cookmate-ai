import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import GlobalApi from "@/services/GlobalApi";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeByCategory() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const categoryName = Array.isArray(params.categoryName)
    ? params.categoryName[0]
    : params.categoryName || "Unknown";

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryName !== "Unknown") {
      fetchRecipes();
    }
  }, [categoryName]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const result = await GlobalApi.GetRecipesByCategory(categoryName);
      if (result.length > 0) {
        setRecipes(result);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Parse JSON strings from the data
  const parseJsonField = (jsonString) => {
    try {
      return JSON.parse(jsonString.replace(/\\/g, ""));
    } catch (e) {
      return [];
    }
  };

  const renderRecipeCard = ({ item }) => {
    const ingredients =
      typeof item.ingredients === "string"
        ? parseJsonField(item.ingredients)
        : item.ingredients || [];

    return (
      <TouchableOpacity
        style={styles.recipeCard}
        onPress={() => {
          // Navigate to recipe detail page (you would implement this)
          // router.push(`/recipe/${item.id}`);

          router.push({
            pathname: "/recipe-detail",
            params: {
              recipe: JSON.stringify(item),
            },
          });
        }}
      >
        <Image
          source={{ uri: item.image_url }}
          style={styles.recipeImage}
          resizeMode="cover"
        />

        <View style={styles.recipeContent}>
          <Text style={styles.recipeName}>{item.recipe_name}</Text>

          <Text style={styles.recipeDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.recipeMetaContainer}>
            <View style={styles.recipeMeta}>
              <Ionicons name="time-outline" size={16} color="#FF9800" />
              <Text style={styles.recipeMetaText}>{item.cook_time} min</Text>
            </View>

            <View style={styles.recipeMeta}>
              <Ionicons name="flame-outline" size={16} color="#FF9800" />
              <Text style={styles.recipeMetaText}>{item.calories} cal</Text>
            </View>

            <View style={styles.recipeMeta}>
              <Ionicons name="people-outline" size={16} color="#FF9800" />
              <Text style={styles.recipeMetaText}>Serves {item.serve_to}</Text>
            </View>
          </View>

          <View style={styles.ingredientsContainer}>
            <Text style={styles.ingredientsTitle}>Main Ingredients:</Text>
            <View style={styles.ingredientsList}>
              {ingredients.slice(0, 3).map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Ionicons name="restaurant-outline" size={12} color="#666" />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
              {ingredients.length > 3 && (
                <Text style={styles.moreIngredientsText}>
                  +{ingredients.length - 3} more
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.header}>{categoryName} Recipes</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF9800" />
          <Text style={styles.loadingText}>Finding delicious recipes...</Text>
        </View>
      ) : recipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="restaurant-outline" size={60} color="#DDD" />
          <Text style={styles.noRecipes}>
            No recipes found in this category.
          </Text>
          <Text style={styles.noRecipesSubtext}>
            Try another category or check back later!
          </Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRecipeCard}
          contentContainerStyle={styles.recipeList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noRecipes: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginTop: 16,
  },
  noRecipesSubtext: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
    textAlign: "center",
  },
  recipeList: {
    padding: 16,
  },
  recipeCard: {
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  recipeImage: {
    width: "100%",
    height: 180,
  },
  recipeContent: {
    padding: 16,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  recipeDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  recipeMetaContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  recipeMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  recipeMetaText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 4,
  },
  ingredientsContainer: {
    marginTop: 4,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  ingredientsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  moreIngredientsText: {
    fontSize: 12,
    color: "#FF9800",
    fontWeight: "500",
  },
});
