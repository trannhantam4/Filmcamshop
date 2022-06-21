import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import COLORS from "../consts/colors";
import axios from "axios";
import { Title } from "react-native-paper";
import { Base64 } from "js-base64";
import { auth } from "../../firebase";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

function LoginScreen({ Dimensions, route, navigation }) {
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);
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
          alert("Wrong email or password");
        }
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
          password: password,
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
      handleLogIn();
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
  // useEffect(() => {
  //   const checkAccount = (async) => {
  //     axios;
  //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //     if (userName == "") {
  //       alert("Please enter Email address");
  //     } else if (password == "") {
  //       alert("Please enter password address");
  //     } else if (reg.test(userName) == false) {
  //       alert("Wrong");
  //       return false;
  //     } else {
  //       adminLogin();
  //     }
  //   };

  //   const userLogin = async () => {
  //     axios
  //       .post(
  //         "http://192.168.47.238/api/userLogin.php",
  //         JSON.stringify({
  //           username: userName,
  //           password: encPass,
  //         })
  //       )
  //       .then((response) => {
  //         if (response.data === "ok") {
  //           alert("Login Success");
  //           navigation.navigate("Home");
  //         } else {
  //           alert("Wrong Login Details, Try again!");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };
  //   if (isSubmit) {
  //     checkAccount();
  //   }
  // }, [isSubmit]);

  return (
    <View style={{ flex: 3, backgroundColor: COLORS.green }}>
      <View
        style={{
          marginTop: height / 4,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          width: width,
          justifyContent: "flex-start",
          flex: 2,
          alignContent: "flex-start",
          alignSelf: "flex-end",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            borderColor: "grey",
            padding: 10,
            width: width * 0.6,
            borderRadius: 10,
            alignItems: "center",
            fontSize: 20,
            fontWeight: "bold",
            borderWidth: 1,
            alignContent: "center",
            alignSelf: "center",
            marginTop: height * 0.2,
          }}
          autoComplete="email"
          placeholder="Email..."
          onChangeText={(text) => setUserName(text)}
        ></TextInput>
        <TextInput
          style={{
            borderColor: "grey",
            padding: 10,
            width: width * 0.6,
            borderRadius: 10,
            fontSize: 20,
            fontWeight: "bold",
            alignItems: "center",
            borderWidth: 1,
            alignContent: "center",
            alignSelf: "center",
            marginTop: 15,
          }}
          autoComplete="password"
          secureTextEntry={true}
          placeholder="Password...."
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            borderRadius: 10,
            backgroundColor: "#fff",
            width: width / 2,
            marginTop: 15,
            alignItems: "center",
            padding: 10,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 4,
            borderBottomWidth: 4,
            borderColor: "#61d47c",
          }}
          onPress={() => {
            checkAdmin();
          }}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            borderRadius: 10,
            backgroundColor: "#fff",
            alignItems: "center",
            width: width / 2,
            marginTop: 15,
            padding: 10,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 4,
            borderBottomWidth: 4,
            borderColor: "#61d47c",
          }}
          onPress={() => {
            handleSignUp();
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", margin: 30 }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={{ color: "#3253fa" }}>Just Surf products</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
export default LoginScreen;