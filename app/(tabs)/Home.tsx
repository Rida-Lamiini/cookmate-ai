import { View, Text } from "react-native";
import React from "react";
import IntroSection from "@/components/IntroSection";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Home() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {" "}
      {/* Wrap content with GestureHandlerRootView */}
      {/* intro */}
      <IntroSection />
      {/* Recioe Genrerator ui */}
      {/* Category */}
    </GestureHandlerRootView>
  );
}
