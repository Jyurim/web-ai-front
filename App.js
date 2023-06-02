import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
// import Map from "./components/Map";

export default function App() {
  const devices = useCameraDevices();
  const device = devices.back;
  const [cameraPermission, setCameraPermission] = useState(null);
  const cameraRef = useRef();
  var lastTap = null;

  useEffect(() => {
    const checkPermission = async () => {
      // 카메라 권한 확인
      const newCameraPermission = await Camera.requestCameraPermission();
      setCameraPermission(newCameraPermission);
    };
    checkPermission();
  }, []);

  const handleCapture = async () => {
    try {
      const photo = await cameraRef.current.takePhoto();
      console.log(photo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    //두번째 tap이 지난 tap을 한지 0.03초 이내에 이뤄졌을 때 -> Double tap
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      handleCapture();
    } else {
      lastTap = now;
    }
  };

  return cameraPermission === "authorized" ? (
    <View>
      <View style={styles.red}>
        <Text>지도</Text>
      </View>
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <Camera
          style={styles.fillHalfScreen}
          device={device}
          isActive={true}
          photo={true}
          ref={cameraRef}
        />
      </TouchableWithoutFeedback>
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
