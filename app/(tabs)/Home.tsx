// Home.js - Updated for continuous flow
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import IntroSection from "@/components/IntroSection";
import RecipeGenerator from "@/components/RecipeGenerator";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import CategorySection from "@/components/CategorySection";

export default function Home() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 30,
        }}
      >
        <IntroSection />
        <RecipeGenerator />
        <CategorySection />
      </ScrollView>
    </GestureHandlerRootView>
  );
}
