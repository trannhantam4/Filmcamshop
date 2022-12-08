import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import firebase from "firebase";
import COLORS from "../consts/colors";
import { auth } from "../../firebase";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");


function FogotPwdScreen({ Dimensions, route, navigation }) {
  const [email_1, setUserName] = useState("");

  const { email } = route.params;

  const forgetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);
  return (
    <View style={{ flex: 2, backgroundColor: COLORS.green }}>
      <ImageBackground
        style={{ width: width, height: height }}
        source={require("../../app/assets/market.png")}
      >
        <View
          style={{
            marginTop: height / 2.7,
            backgroundColor: COLORS.white,
            borderRadius: 40,
            width: width * 0.7,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <View style={{ marginTop: height / 20 }}>
            <TextInput
              style={styles.input}
              autoComplete="email"
              defaultValue={email}
              onChangeText={(text) => setUserName(text)}
            ></TextInput>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                forgetPassword();
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>

            
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    color: COLORS.green,
    fontWeight: "bold",
    fontSize: width / 22,
  },
  btn: {
    margin: height / 10,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: width / 2.3,
    marginTop: 15,
    alignItems: "center",
    padding: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#61d47c",
  },
  input: {
    borderColor: "grey",
    padding: 10,
    width: width * 0.6,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    alignItems: "center",
    fontSize: height / 40,
    height: height / 15,
    fontWeight: "bold",
    borderWidth: 1,
    alignContent: "center",
    alignSelf: "center",
    marginTop: height / 40,
  },
  buyBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 25,
    width: width * 0.3,
    height: height * 0.2,

    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
  },
  bordetBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    width: width * 0.15,
    height: height * 0.15,
    backgroundColor: COLORS.green,
    justifyContent: "space-around",
    alignItems: "center",
  },
  borderBtnText: {
    color: COLORS.white,
    alignItems: "center",
    fontSize: width * 0.06,
    alignContent: "center",
  },
  priceTag: {
    width: width * 0.3,
    backgroundColor: COLORS.green,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    height: height * 0.2,
    alignItems: "center",
  },
  header: {
    paddingTop: height * 0.15,
    paddingHorizontal: width * 0.07,
    paddingBottom: height * 0.06,
    flexDirection: "row",
    backgroundColor: COLORS.green,
    justifyContent: "space-between",
  },
  imageContainer: {
    marginTop: height * 0.1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {
    height: height * 1.7,
    backgroundColor: COLORS.light,
    borderRadius: 20,
    paddingTop: 30,
    marginTop: height * 0.1,
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
  },
});
export default FogotPwdScreen;
