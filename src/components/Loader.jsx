import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";

const Loader = ({ visible }) => {
  if (!visible) return null

  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </View>
    </Modal>
  )
}

export default Loader

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  loaderContainer: {
    backgroundColor: "rgba(30, 41, 59, 0.9)", // oscuro
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  }
})
