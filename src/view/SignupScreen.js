import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Picker,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
const { width } = Dimensions.get("window");
import { Base64 } from "js-base64";
const height = width * 0.6;

function SignupScreen({ navigation }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [encPass, setEncPass] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      axios
        .post(
          "http://www.filmcamshop.com/api/userRegistration.php",
          JSON.stringify({
            username: userName,
            password: encPass,
            email: userEmail,
            phone: phoneNumber,
          })
        )
        .then((response) => response.data)
        .then((responseJson) => {
          if (responseJson === "ok") {
            alert("Sign up Success!");
            navigation.navigate("Home");
          } else {
            alert("This Email has been used!");
            navigation.navigate("Home");
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

  const usernameHandler = (text) => {
    setUsername(text);
  };

  const passwordHandler = (text) => {
    setPassword(text);
  };

  const emailHandler = (text) => {
    setEmail(text);
  };

  const phoneNumberHandler = (text) => {
    setPhoneNumber(text);
  };

  return (
    <View>
      <TextInput
        style={{
          borderColor: "grey",
          padding: 10,
          width: width / 2,
          borderRadius: 5,
          fontSize: 15,
          fontWeight: "bold",
          borderWidth: 1,
          alignContent: "center",
          alignSelf: "center",
          marginTop: height / 3,
        }}
        placeholder="User Name"
        onChangeText={usernameHandler}
      ></TextInput>
      <TextInput
        style={{
          borderColor: "grey",
          padding: 10,
          width: width / 2,
          borderRadius: 5,
          fontSize: 15,
          fontWeight: "bold",
          borderWidth: 1,
          alignContent: "center",
          alignSelf: "center",
          marginTop: 10,
        }}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={passwordHandler}
      ></TextInput>

      <TextInput
        style={{
          borderColor: "grey",
          padding: 10,
          width: width / 2,
          borderRadius: 5,
          fontSize: 15,
          fontWeight: "bold",
          borderWidth: 1,
          alignContent: "center",
          alignSelf: "center",
          marginTop: 10,
        }}
        placeholder="Email"
        onChangeText={emailHandler}
      ></TextInput>

      <TextInput
        style={{
          borderColor: "grey",
          padding: 10,
          width: width / 2,
          borderRadius: 5,
          fontSize: 15,
          fontWeight: "bold",
          borderWidth: 1,
          alignContent: "center",
          alignSelf: "center",
          marginTop: 10,
        }}
        placeholder="Phone Number"
        onChangeText={phoneNumberHandler}
      ></TextInput>
      <Button
        style={styles.buttonMenuTop}
        onPress={() => {
          setEncPass(Base64.encode(password));
          setIsSubmit(true);
        }}
        title="Sign Up"
      ></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    marginRight: 0,
    width: width,
    height: height / 0.2,
  },
  buttonMenuTop: {
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: "gray",
    textAlign: "center",
    flexDirection: "column",
    width: "28%",
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#61d47c",
  },
  slider: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  header: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#61d47c",
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
  pagingText: {
    fontSize: width / 30,
    color: "#888",
  },
  pagingActiveText: {
    fontSize: width / 25,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    fontSize: 20,
    padding: 0,
    color: "#61d47c",
  },
  productCard: {
    width: width * 0.93,
    height: height * 1.5,
    borderColor: "#9c9c9c",
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 10,
    marginBottom: 20,
    paddingBottom: 20,
  },
  productImage: {
    width: "100%",
    height: height,
    resizeMode: "contain",
    borderRadius: 5,
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 35,
    paddingBottom: height / 5,
  },
  productName: {
    paddingTop: 15,
    paddingLeft: 5,
    fontSize: height / 10,
    fontWeight: "bold",
  },
  productDes: {
    paddingLeft: 5,
    fontSize: height / 13,
    marginBottom: 10,
    paddingBottom: 20,
  },
});
export default SignupScreen;
