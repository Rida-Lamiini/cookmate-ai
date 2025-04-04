import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import Landing from "./Landing";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { UserContext } from "@/context/UserContext";
import { useState } from "react";

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }
  const [loaded, error] = useFonts({
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-ExtraBold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
  });

  const [userData, setUserData] = useState();
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Stack>
          <Stack.Screen name="Landing" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen
            name="recipe-by-category/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="recipe-detail/index"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </UserContext.Provider>
    </ClerkProvider>
  );
}
