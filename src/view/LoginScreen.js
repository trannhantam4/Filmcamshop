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
import { Base64 } from "js-base64";
import COLORS from "../consts/colors";
import axios from "axios";

import { auth } from "../../firebase";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

function LoginScreen({ Dimensions, route, navigation }) {
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const checkActive = async () => {
    axios
      .post(
        "http://www.filmcamshop.com/api/checkActive.php",
        JSON.stringify({
          email: email,
        })
      )
      .then((response) => response.data)
      .then((responseJson) => {
        if (responseJson === "ok") {
          handleLogIn();
        } else {
          alert("This acccount has been Disable due to bad activities");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  const adminLog = async () => {
    axios
      .post(
        "http://www.filmcamshop.com/api/adminLogin.php",
        JSON.stringify({
          email: email,
          password: password,
        })
      )
      .then((response) => response.data)
      .then((responseJson) => {
        if (responseJson === "ok") {
          alert("Sign up Success!");
          navigation.navigate("AdminScreen");
        } else {
          checkActive();
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

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

  const authenticate = async () => {
    axios
      .post(
        "http://www.filmcamshop.com/api/userRegistration.php",
        JSON.stringify({
          email: email,
          password: Base64.password,
        })
      )
      .then((response) => response.data)
      .then((responseJson) => {
        if (responseJson === "ok") {
          alert("Sign up Success!");
          navigation.navigate("Home");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  const checkAdmin = () => {
    let regex = /^[A-Za-z0-9._%+-]+@filmcamshop\.com$/;
    if (regex.test(email) == false) {
      checkActive();
    } else {
      adminLog();
    }
  };
  const handleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with", user.email);
      })
      .catch((error) => alert(error.message));
  };
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
        authenticate();
      })
      .catch((error) => alert(error.message));
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
              placeholder="Email"
              
              onChangeText={(text) => setUserName(text)}
            ></TextInput>
            <TextInput
              style={styles.input}
              autoComplete="password"
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                checkAdmin();
              }}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                authenticate();
                handleSignUp();
              }}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center", marginTop: 30 }}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text style={{ fontSize: height / 60, color: COLORS.blue }}>
                Just Surf products
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center", marginBottom: 30, marginTop: 10 }}
              onPress={() => {
                navigation.navigate('FogotPwd', {email});
              }}
            >
              <Text style={{ fontSize: height / 60, color: COLORS.blue }}>
                Forgot Password?
              </Text>
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
  header: {
    paddingTop: height * 0.15,
    paddingHorizontal: width * 0.07,
    paddingBottom: height * 0.06,
    flexDirection: "row",
    backgroundColor: COLORS.green,
    justifyContent: "space-between",
  },
});
export default LoginScreen;