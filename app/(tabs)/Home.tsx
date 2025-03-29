import { View, Text } from "react-native";
import React from "react";
import IntroSection from "@/components/IntroSection";
import RecipeGenerator from "@/components/RecipeGenerator";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

export default function Home() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <IntroSection />
        {/* Recioe Genrerator ui */}
        <RecipeGenerator />
      </ScrollView>
      {/* Wrap content with GestureHandlerRootView */}
      {/* intro */}

      {/* Category */}
    </GestureHandlerRootView>
  );
}
