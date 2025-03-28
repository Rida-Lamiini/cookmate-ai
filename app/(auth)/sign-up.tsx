import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle sign-up submission
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      await signUp.create({
        emailAddress: emailAddress.trim(),
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error("Sign-up error:", err);
      Alert.alert("Error", err.errors?.[0]?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  // Handle verification submission
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error("Verification not complete:", signUpAttempt);
        Alert.alert("Verification Error", "Please complete additional steps.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "Invalid verification code."
      );
    }

    setLoading(false);
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify Your Email</Text>
        <TextInput
          value={code}
          placeholder="Enter verification code"
          onChangeText={setCode}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={onVerifyPress}
          style={styles.button}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Verifying..." : "Verify"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={onSignUpPress}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing up..." : "Continue"}
        </Text>
      </TouchableOpacity>
      <View style={styles.signInContainer}>
        <Text>Already have an account?</Text>
        <Link href="/sign-in">
          <Text style={styles.signInText}>Sign in</Text>
        </Link>
      </View>
    </View>
  );
}

// ✅ Basic Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#f97316",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  signInContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  signInText: {
    color: "#f97316",
    marginLeft: 5,
  },
});
