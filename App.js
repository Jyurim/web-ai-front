import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";

export default function App() {
  const devices = useCameraDevices();
  const device = devices.back;

  const [cameraPermission, setCameraPermission] = useState(null);

  async function requestCameraPermission() {
    const newCameraPermission = await Camera.requestCameraPermission();

    setCameraPermission(newCameraPermission);
  }

  return cameraPermission === "authorized" ? (
    <View>
      <View style={styles.red}>
        <Text>지도?</Text>
      </View>
      <Camera style={styles.fillHalfScreen} device={device} isActive={true} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text>Camera permission: {cameraPermission}</Text>
      <Button
        onPress={requestCameraPermission}
        title="Request camera permission"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  fillHalfScreen: {
    height: "50%",
    width: "100%",
  },
  red: {
    backgroundColor: "red",
    height: "50%",
    width: "100%",
  },
});
