import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import Landing from "./Landing";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "Outfit-Regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "Outfit-ExtraBold": require("../assets/fonts/Outfit-ExtraBold.ttf"),
  });
  return (
    <Stack>
      <Stack.Screen name="Landing" options={{ headerShown: false }} />
    </Stack>
  );
}
