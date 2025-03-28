import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import icons from Ionicons

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          headerShown: false, // Hide header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} /> // Home icon
          ),
          tabBarStyle: { backgroundColor: "#f2f2f2" }, // Set background color for Home tab
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          title: "Explore",
          headerShown: false, // Hide header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} /> // Search icon
          ),
          tabBarStyle: { backgroundColor: "#cce7ff" }, // Set background color for Explore tab
        }}
      />
      <Tabs.Screen
        name="Cookbook"
        options={{
          title: "Cookbook",
          headerShown: false, // Hide header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} /> // Cooking-related icon
          ),
          tabBarStyle: { backgroundColor: "#ffebc9" }, // Set background color for Cookbook tab
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false, // Hide header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} /> // Profile icon
          ),
          tabBarStyle: { backgroundColor: "#e0f7fa" }, // Set background color for Profile tab
        }}
      />
    </Tabs>
  );
}
