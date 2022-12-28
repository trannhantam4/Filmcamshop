import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import COLORS from "../consts/colors";
import { auth } from "../../firebase";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataSource: [],
      inputTrigger: false,
      email: auth.currentUser?.email,
    };
  }

  // updateorderStatus = (orderStatus) => {
  //   this.setState({ orderStatus: orderStatus });
  // };

  // checkInput = () => {
  //   const { orderStatus_temp, orderStatus } = this.state;
  //   if (orderStatus == "") {
  //     alert("Please chose status");
  //   } else {
  //     this.componentDidMount();
  //   }
  // };

  editableHandler = () => {
    this.setState({ inputTrigger: true });
  };

  componentDidMount() {
    const { email } = this.state;

    console.log(email);

    return fetch("http://www.filmcamshop.com/api/getUserProfile.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userEmail: email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          userDataSource: responseJson.user,
        });
        console.log(this.state.userDataSource);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const { userDataSource, inputTrigger } = this.state;

    return (
      <SafeAreaView>
        <ImageBackground
          style={{ width: width, height: height }}
          source={require("../../app/assets/logo_wallpaper_2.png")}
        >
          <View>
            <Text style={styles.pageTitle}>My Profile</Text>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "column", paddingBottom: 20 }}>
                <Text style={styles.textField}>Customer:</Text>
                <Text style={styles.textField}>Address:</Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: width * 0.038,
                    marginLeft: width * 0.03,
                    marginTop: 16,
                    padding: 10,
                  }}
                >
                  My Phone:
                </Text>
                <Text style={styles.textField}>My Email:</Text>
              </View>

              <View>
                {userDataSource.map((item, key) => (
                  <>
                    <TextInput
                      key={"username" + item}
                      style={styles.inputText}
                      multiline
                      defaultValue={item.userName}
                      editable={inputTrigger}
                    ></TextInput>
                    <TextInput
                      key={"address" + item}
                      style={styles.inputText}
                      defaultValue={item.address}
                      multiline
                      editable={inputTrigger}
                    ></TextInput>
                    <TextInput
                      key={"phone" + item}
                      style={styles.inputText}
                      defaultValue={"0" + item.phone}
                      editable={inputTrigger}
                    ></TextInput>
                    <TextInput
                      key={"userEmail" + item}
                      style={styles.inputText}
                      defaultValue={item.userEmail}
                      editable={inputTrigger}
                    ></TextInput>
                  </>
                ))}
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 50}}>
              <TouchableOpacity
                style={styles.buttonMenuTop}
                onPress={this.editableHandler}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonMenuTop}
                onPress={this.checkInput}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonMenuTop}
                onPress={() => this.props.navigation.navigate("OrderStatus")}
              >
                <Text style={styles.buttonText}>My Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  TextStyle: {
    fontSize: 20,
    color: "#000",
    textAlign: "left",
  },
  picker: {
    height: height * 0.1,
    width: width * 0.4,

    fontSize: 15,
    fontWeight: "bold",
    marginTop: 5,
  },
  buttonMenuTop: {
    shadowOpacity: 0.5,
    shadowRadius: 10,

    textAlign: "center",
    flexDirection: "column",
    width: "28%",
    backgroundColor: "#fff",
    padding: 10,
    alignSelf: "center",

    borderRadius: 5,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#61d47c",
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
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: 1,
    color: "black",

    fontSize: 15,
    fontWeight: "bold",
    textAlign: "auto",

    marginTop: 10,
    width: width * 0.65,
    padding: 5,
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
  textField: {
    fontWeight: "bold",
    fontSize: width * 0.038,
    marginLeft: width * 0.03,
    marginTop: 10,
    padding: 10,
  },
  pageTitle: {
    color: COLORS.green,
    paddingTop: height * 0.05,
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
});
