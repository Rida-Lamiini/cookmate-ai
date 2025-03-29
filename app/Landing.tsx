import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Marquee } from "@animatereactnative/marquee";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Get screen dimensions for responsive layout
const { width } = Dimensions.get("window");

export default function Landing() {
  const router = useRouter();

  const imageList = [
    require("../assets/images/1.jpg"),
    require("../assets/images/c1.jpg"),
    require("../assets/images/2.jpg"),
    require("../assets/images/c2.jpg"),
    require("../assets/images/3.jpg"),
    require("../assets/images/c3.jpg"),
    require("../assets/images/4.jpg"),
    require("../assets/images/5.jpg"),
    require("../assets/images/6.jpg"),
  ];

  return (
    <GestureHandlerRootView style={styles.root}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Marquee section */}
        <View style={styles.marqueeContainer}>
          <MarqueeRow images={imageList} speed={0.5} />
          <MarqueeRow images={imageList} speed={0.8} rtl={true} />
          <MarqueeRow images={imageList} speed={0.5} />
        </View>

        {/* Content section */}
        <SafeAreaView style={styles.contentContainer}>
          <Text style={styles.title}>
            Cookmate AI 🥗🔍 | Find, Create & Enjoy Delicious Recipes!
          </Text>
          <Text style={styles.subtitle}>
            Generate delicious recipes in seconds with the power of AI! 🍔✨
          </Text>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => router.push("/(auth)/sign-in")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Feather
              name="chevron-right"
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

// ✅ Extracted reusable MarqueeRow component
const MarqueeRow = ({ images, speed, rtl = false }) => (
  <Marquee spacing={10} speed={speed} rtl={rtl} style={styles.marqueeRotate}>
    <View style={styles.marquee}>
      {images.map((image, index) => (
        <Image
          source={image}
          key={`${rtl ? "rtl" : "ltr"}-image-${index}`}
          style={styles.image}
        />
      ))}
    </View>
  </Marquee>
);

const Colors = {
  PRIMARY: "#f97316",
  PRIMARY_DARK: "#ea580c",
  WHITE: "#fff",
  GRAY: "#6b7280",
  LIGHT_GRAY: "#f5f5f5",
  BACKGROUND_GRADIENT_START: "#fff7ed",
  BACKGROUND_GRADIENT_END: "#ffffff",
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  marqueeContainer: {
    paddingVertical: 30,
    backgroundColor: Colors.BACKGROUND_GRADIENT_START,
    overflow: "hidden",
  },
  marqueeRotate: {
    transform: [{ rotate: "-4deg" }],
    marginVertical: 10,
  },
  marquee: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: width * 0.35,
    height: width * 0.35,
    margin: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.WHITE,
  },
  contentContainer: {
    padding: 24,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontFamily: "Outfit-ExtraBold", // Ensure font is loaded
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: "Outfit", // Ensure font is loaded
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "Outfit-Medium", // Ensure font is loaded
    fontSize: 18,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});
