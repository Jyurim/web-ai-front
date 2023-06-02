import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
// import Map from "./components/Map";

export default function App() {
  const devices = useCameraDevices();
  const device = devices.back;
  const [cameraPermission, setCameraPermission] = useState(null);

  useEffect(() => {
    const checkPermission = async () => {
      // 카메라 권한 확인
      const newCameraPermission = await Camera.requestCameraPermission();
      setCameraPermission(newCameraPermission);
    };
    checkPermission();
  }, []);
  return cameraPermission === "authorized" ? (
    <View>
      <View style={styles.red}>
        <Text>지도</Text>
      </View>
      <Camera style={styles.fillHalfScreen} device={device} isActive={true} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={{ backgroundColor: "red", height: "100%", width: "100%" }}>
        <Text>지도</Text>
      </View>
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
