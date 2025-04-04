import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const recipe = params.recipe ? JSON.parse(params.recipe) : null;
  const [activeTab, setActiveTab] = useState("ingredients");
  const [isFavorite, setIsFavorite] = useState(false);

  console.log("55555");

  console.log(recipe.image_url);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.errorContent}>
          <Ionicons name="warning-outline" size={60} color="#FF9800" />
          <Text style={styles.errorText}>Recipe Not Found</Text>
          <Text style={styles.errorSubtext}>
            The recipe you're looking for is unavailable.
          </Text>
          <TouchableOpacity
            style={styles.returnButton}
            onPress={() => router.back()}
          >
            <Text style={styles.returnButtonText}>Return to Recipes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Parse JSON strings from the data
  const parseJsonField = (jsonString) => {
    try {
      if (typeof jsonString === "string") {
        return JSON.parse(jsonString.replace(/\\/g, ""));
      }
      return jsonString || [];
    } catch (e) {
      return [];
    }
  };

  const ingredients = parseJsonField(recipe.ingredients);
  const steps = parseJsonField(recipe.steps);
  const categories = parseJsonField(recipe.categories);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  // Calculate prep time (estimated as 1/3 of cook time)
  const prepTime = Math.round(recipe.cook_time / 3);

  // Share recipe
  const shareRecipe = async () => {
    try {
      await Share.share({
        message: `Check out this delicious ${recipe.recipe_name} recipe I found! ${recipe.description}`,
        title: recipe.recipe_name,
      });
    } catch (error) {
      console.error("Error sharing recipe:", error);
    }
  };

  // Calculate difficulty based on number of steps and ingredients
  const calculateDifficulty = () => {
    const complexityScore = steps.length * 0.6 + ingredients.length * 0.4;
    if (complexityScore < 5) return "Easy";
    if (complexityScore < 10) return "Medium";
    return "Hard";
  };

  const difficulty = calculateDifficulty();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: recipe.image_url.replace(
                "ai-guru-lab-images/",
                "ai-guru-lab-images%2F"
              ),
            }}
            style={styles.recipeImage}
            resizeMode="cover"
          />
          <View style={styles.imageOverlay} />
          <TouchableOpacity
            style={styles.backButtonOverlay}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "#FF5252" : "#fff"}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={shareRecipe}>
              <Ionicons name="share-social-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {categories && categories.length > 0 && (
            <View style={styles.imageCategories}>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryText}>{categories[0]}</Text>
              </View>
              {categories.length > 1 && (
                <View style={styles.categoryCountTag}>
                  <Text style={styles.categoryCountText}>
                    +{categories.length - 1}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Recipe Title and Meta */}
        <View style={styles.contentContainer}>
          <Text style={styles.recipeName}>{recipe.recipe_name}</Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={20} color="#FF9800" />
              <Text style={styles.metaText}>{recipe.cook_time} min</Text>
            </View>

            <View style={styles.metaDivider} />

            <View style={styles.metaItem}>
              <Ionicons name="flame-outline" size={20} color="#FF9800" />
              <Text style={styles.metaText}>{recipe.calories} cal</Text>
            </View>

            <View style={styles.metaDivider} />

            <View style={styles.metaItem}>
              <Ionicons name="people-outline" size={20} color="#FF9800" />
              <Text style={styles.metaText}>Serves {recipe.serve_to}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{recipe.description}</Text>

          {/* Additional Info Cards */}
          <View style={styles.infoCardsContainer}>
            <View style={styles.infoCard}>
              <Ionicons name="timer-outline" size={24} color="#FF9800" />
              <Text style={styles.infoCardTitle}>Prep Time</Text>
              <Text style={styles.infoCardValue}>{prepTime} min</Text>
            </View>

            <View style={styles.infoCard}>
              <Ionicons name="restaurant-outline" size={24} color="#FF9800" />
              <Text style={styles.infoCardTitle}>Cook Time</Text>
              <Text style={styles.infoCardValue}>{recipe.cook_time} min</Text>
            </View>

            <View style={styles.infoCard}>
              <Ionicons name="barbell-outline" size={24} color="#FF9800" />
              <Text style={styles.infoCardTitle}>Difficulty</Text>
              <Text style={styles.infoCardValue}>{difficulty}</Text>
            </View>
          </View>

          {/* All Categories */}
          {categories && categories.length > 0 && (
            <View style={styles.allCategoriesSection}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <View style={styles.categoriesContainer}>
                {categories.map((category, index) => (
                  <View key={index} style={styles.categoryTag}>
                    <Text style={styles.categoryText}>{category}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "ingredients" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("ingredients")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "ingredients" && styles.activeTabText,
                ]}
              >
                Ingredients
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "instructions" && styles.activeTab,
              ]}
              onPress={() => setActiveTab("instructions")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "instructions" && styles.activeTabText,
                ]}
              >
                Instructions
              </Text>
            </TouchableOpacity>
          </View>

          {/* Ingredients List */}
          {activeTab === "ingredients" && (
            <View style={styles.ingredientsContainer}>
              <View style={styles.servingAdjuster}>
                <Text style={styles.servingText}>
                  Ingredients for {recipe.serve_to} servings
                </Text>
                <View style={styles.servingControls}>
                  <TouchableOpacity style={styles.servingButton}>
                    <Ionicons name="remove" size={16} color="#FF9800" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.servingButton}>
                    <Ionicons name="add" size={16} color="#FF9800" />
                  </TouchableOpacity>
                </View>
              </View>

              {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Instructions List */}
          {activeTab === "instructions" && (
            <View style={styles.instructionsContainer}>
              {steps.map((step, index) => (
                <View key={index} style={styles.instructionItem}>
                  <View style={styles.stepNumberContainer}>
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                  </View>
                  <Text style={styles.instructionText}>{step}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Chef Info */}
          <View style={styles.chefContainer}>
            <View style={styles.chefIconContainer}>
              <Ionicons name="person" size={24} color="#fff" />
            </View>
            <View style={styles.chefInfo}>
              <Text style={styles.chefTitle}>Recipe by</Text>
              <Text style={styles.chefName}>
                {recipe.user_email.split("@")[0]}
              </Text>
              <Text style={styles.dateAdded}>
                Added on {formatDate(recipe.created_at)}
              </Text>
            </View>
          </View>

          {/* Nutritional Info */}
          <View style={styles.nutritionContainer}>
            <Text style={styles.sectionTitle}>Nutritional Information</Text>
            <View style={styles.nutritionRow}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{recipe.calories}</Text>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>

              {/* Estimated nutritional values based on calories */}
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>
                  {Math.round(recipe.calories * 0.04)}g
                </Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>

              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>
                  {Math.round(recipe.calories * 0.03)}g
                </Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>

              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>
                  {Math.round(recipe.calories * 0.1)}g
                </Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
            </View>
          </View>

          {/* Tips Section */}
          <View style={styles.tipsContainer}>
            <Text style={styles.sectionTitle}>Chef's Tips</Text>
            <View style={styles.tipItem}>
              <Ionicons
                name="bulb-outline"
                size={20}
                color="#FF9800"
                style={styles.tipIcon}
              />
              <Text style={styles.tipText}>
                For best results, let ingredients come to room temperature
                before cooking.
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons
                name="bulb-outline"
                size={20}
                color="#FF9800"
                style={styles.tipIcon}
              />
              <Text style={styles.tipText}>
                You can substitute ingredients based on dietary preferences.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  errorContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
  },
  errorSubtext: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  returnButton: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#FF9800",
    borderRadius: 8,
  },
  returnButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 280,
  },
  recipeImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backButtonOverlay: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtons: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  imageCategories: {
    position: "absolute",
    bottom: 16,
    left: 16,
    flexDirection: "row",
  },
  contentContainer: {
    padding: 20,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#666",
  },
  metaDivider: {
    width: 1,
    height: 20,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 12,
  },
  infoCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    marginHorizontal: 4,
  },
  infoCardTitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  infoCardValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 2,
  },
  allCategoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoryTag: {
    backgroundColor: "#FFF3E0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#FFCC80",
  },
  categoryText: {
    fontSize: 12,
    color: "#E65100",
    fontWeight: "500",
  },
  categoryCountTag: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  categoryCountText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 24,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF9800",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#999",
  },
  activeTabText: {
    color: "#FF9800",
  },
  servingAdjuster: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  servingText: {
    fontSize: 14,
    color: "#666",
  },
  servingControls: {
    flexDirection: "row",
  },
  servingButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  ingredientsContainer: {
    marginBottom: 24,
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF9800",
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  instructionsContainer: {
    marginBottom: 24,
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  stepNumber: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  instructionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    flex: 1,
  },
  chefContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  chefIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF9800",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  chefInfo: {
    flex: 1,
  },
  chefTitle: {
    fontSize: 12,
    color: "#666",
  },
  chefName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textTransform: "capitalize",
  },
  dateAdded: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  nutritionContainer: {
    marginBottom: 24,
  },
  nutritionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 16,
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  nutritionLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  tipsContainer: {
    marginBottom: 24,
  },
  tipItem: {
    flexDirection: "row",
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  tipIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});
