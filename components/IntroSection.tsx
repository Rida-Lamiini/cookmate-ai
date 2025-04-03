// IntroSection.js - Updated for continuous flow
import { UserContext } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Switch } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const IntroSection = () => {
  const [enabled, setEnabled] = useState(false);
  const { userData } = useContext(UserContext);
  console.log("User Data:", userData);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "breakfast";
    if (hour < 18) return "lunch";
    return "dinner";
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGradient}>
        <View style={styles.section}>
          <View style={styles.profileRow}>
            <Image
              source={{ uri: userData.picture }}
              style={styles.profileImage}
            />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeText}>Hello, Chef!</Text>
              <Text style={styles.header}>{userData.name}</Text>
              <Text style={styles.subheader}>
                Ready for some {getGreeting()} inspiration?
              </Text>
            </View>
          </View>

          <View style={styles.preferenceContainer}>
            <View style={styles.preferenceTextContainer}>
              <Text style={styles.preferenceTitle}>Dietary Preference</Text>
              <Text style={styles.preferenceDescription}>
                {enabled
                  ? "Showing vegetarian recipes"
                  : "Showing all recipes including meat"}
              </Text>
            </View>

            <View style={styles.switchContainer}>
              <View
                style={[styles.iconContainer, !enabled && styles.activeIcon]}
              >
                <Ionicons
                  name="fast-food"
                  size={18}
                  color={!enabled ? "#fff" : "#888"}
                />
              </View>

              <Switch
                value={enabled}
                onValueChange={() => setEnabled(!enabled)}
                trackColor={{ false: "#E57373", true: "#81C784" }}
                thumbColor={enabled ? "#4CAF50" : "#D32F2F"}
                style={styles.switch}
              />

              <View
                style={[styles.iconContainer, enabled && styles.activeIcon]}
              >
                <Ionicons
                  name="leaf"
                  size={18}
                  color={enabled ? "#fff" : "#888"}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  backgroundGradient: {
    backgroundColor: "#FFF8E1",
    paddingBottom: 15,
  },
  section: {
    padding: 20,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#FF9800",
  },
  welcomeTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: "#FF9800",
    fontWeight: "600",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subheader: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  preferenceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preferenceTextContainer: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  preferenceDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    flexShrink: 1,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  switch: {
    marginHorizontal: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  activeIcon: {
    backgroundColor: "#FF9800",
  },
});

export default IntroSection;
