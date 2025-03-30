import { View, Text, Modal, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function LoadingDialog({
  visible = false,
  text = "Loading...",
}) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.dialog}>
          <View style={styles.loadingIconContainer}>
            <ActivityIndicator size="large" color="#4a4aff" />
          </View>
          <Text style={styles.dialogText}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  dialog: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  loadingIconContainer: {
    marginBottom: 12,
  },
  dialogText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
});
