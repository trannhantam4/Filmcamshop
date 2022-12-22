import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert,
} from "react-native";
import axios from "axios";
import COLORS from "../../consts/colors";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  buttonMenuTop: {
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: width * 0.3,
    height: height * 0.06,
    marginTop: 15,
    padding: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#61d47c",
  },
  buttonText: {
    color: "#61d47c",
    height: height * 0.2,
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  inputText: {
    color: "#fff",
    fontSize: 15,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
  },
  button: {
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowColor: "gray",
    width: "45%",
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    position: "relative",
    borderColor: "#61d47c",
    
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  picker: {
    color: COLORS.green,
    fontWeight: "bold",
    backgroundColor: COLORS.white,
    alignContent: "center",
    alignSelf: "center",
    height: height * 0.05,
    width: width * 0.3,
    margin: height * 0.1,
    size: height * 0.5,
    borderRadius: 2,
    borderColor: COLORS.green,
  },
});

export default function UpdateProduct({ navigation, route }) {
  const [status, setStat] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const { userEmail } = route.params;
  const { active } = route.params;
  useEffect(() => {
    const authenticate = async () => {
      axios
        .post(
          "http://www.filmcamshop.com/api/UpdateUser.php",
          JSON.stringify({
            userEmail: userEmail,
            status: status,
          })
        )
        .then((response) => response.data)
        .then((responseJson) => {
          if (responseJson === "ok") {
            alert("Update Success!");
            navigation.navigate("AdminScreen");
          } else {
            alert("Try again");
            navigation.navigate("AdminScreen");
          }
        })
        .catch((error) => {
          alert(error);
        });
    };
    if (isSubmit) {
      authenticate();
    }
  }, [isSubmit]);
  return (
    <SafeAreaView
      style={{
        width: width,
        height: height,
      }}
    >
      <ImageBackground
        style={{ width: width, height: height }}
        source={require("../../../app/assets/logo_wallpaper_2.png")}
      >
        <View style={{ height: height, width: width }}>
          {/* <Text style={styles.buttonText}>User Email: {userEmail}</Text> */}

          <Picker
            quantity={status}
            style={styles.picker}
            selectedValue={active}
            onValueChange={(itemValue, itemIndex) => setStat(itemValue)}
          >
            <Picker.Item label="active" value="active" />
            <Picker.Item label="disable" value="disable" />
          </Picker>

          <TouchableOpacity
            style={styles.buttonMenuTop}
            onPress={() => {
              setIsSubmit(true);
            }}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
