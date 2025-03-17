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
import { Feather } from "@expo/vector-icons"; // Assuming you have Expo vector icons

// Get screen dimensions for responsive layout
const { width, height } = Dimensions.get("window");

export default function Landing() {
  // We'll keep the image list as is
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
        {/* Marquee section with background gradient */}
        <View style={styles.marqueeContainer}>
          {/* First marquee - slow speed */}
          <Marquee spacing={10} speed={0.5} style={styles.marqueeRotate}>
            <View style={styles.marquee}>
              {imageList.map((image, index) => (
                <Image
                  source={image}
                  key={`image-1-${index}`}
                  style={styles.image}
                />
              ))}
            </View>
          </Marquee>

          {/* Second marquee - medium speed, opposite direction */}
          <Marquee
            spacing={10}
            speed={0.8}
            rtl={true} // Right to left for variety
            style={[styles.marqueeRotate, { marginVertical: 15 }]}
          >
            <View style={styles.marquee}>
              {imageList.map((image, index) => (
                <Image
                  source={image}
                  key={`image-2-${index}`}
                  style={styles.image}
                />
              ))}
            </View>
          </Marquee>

          {/* Third marquee - slow speed again */}
          <Marquee spacing={10} speed={0.5} style={styles.marqueeRotate}>
            <View style={styles.marquee}>
              {imageList.map((image, index) => (
                <Image
                  source={image}
                  key={`image-3-${index}`}
                  style={styles.image}
                />
              ))}
            </View>
          </Marquee>
        </View>

        {/* Content section */}
        <SafeAreaView style={styles.contentContainer}>
          <Text style={styles.title}>
            Cookmate AI 🥗🔍 | Find, Create & Enjoy Delicious Recipes!
          </Text>

          <Text style={styles.subtitle}>
            Generate delicious recipes in seconds with the power of AI! 🍔✨
          </Text>

          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
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

const Colors = {
  PRIMARY: "#f97316", // Orange color for primary elements
  PRIMARY_DARK: "#ea580c", // Darker orange for pressed states
  WHITE: "#fff",
  GRAY: "#6b7280",
  LIGHT_GRAY: "#f5f5f5",
  BACKGROUND_GRADIENT_START: "#fff7ed", // Light orange/peach
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
  },
  marquee: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: width * 0.35, // Responsive sizing based on screen width
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
    fontFamily: "Outfit-ExtraBold", // Make sure this font is loaded in your app
    fontSize: 24,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: "Outfit", // Make sure this font is loaded in your app
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "Outfit-Medium", // Make sure this font is loaded
    fontSize: 18,
  },
  buttonIcon: {
    marginLeft: 8,
  },
});
