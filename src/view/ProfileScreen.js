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
  Alert,
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
      Email: auth.currentUser?.email,

      userName: "",
      address: "",
      phone: "",
    };
  }
  
  checkInput = () => {
    const { userName, address, phone } = this.state;
    if (userName=="" & address=="" & phone==""){
    } else {
      this.showAlert();
    }
  }

  showAlert = () => {
    Alert.alert("Update your profile", "Do you want to change you profile?", [
      { text: "YES", onPress: this.componentDidMount_updateUser.bind(this) },
      { text: "CANCLE"},
    ]);
  };

  editableHandler = () => {
    this.setState({ inputTrigger: true });
  };

  componentDidMount() {
    const { Email } = this.state;

    return fetch("http://www.filmcamshop.com/api/getUserProfile.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userEmail: Email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          userDataSource: responseJson.user,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount_updateUser() {
    const { Email, userName, address, phone } = this.state;

    return fetch("http://www.filmcamshop.com/api/UpdateUser.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userEmail: Email,

        userName_push: userName,
        address_push: address,
        phone_push: phone,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { userDataSource, inputTrigger} = this.state;

    return (
      <SafeAreaView>
        <ImageBackground
          style={{ width: width, height: height }}
          source={require("../../app/assets/logo_wallpaper_2.png")}
        >
          <View>
            <Text style={styles.pageTitle}>My Profile</Text>

            <View style={{ flexDirection: "row", marginTop: 50}}>
              <View style={{ flexDirection: "column", paddingBottom: 20 }}>
                <Text style={styles.textField}>Customer:</Text>
                <Text style={styles.textField}>Address:</Text>
                <Text style={styles.textField}>My Phone:</Text>
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
                      onChangeText={(text) => this.setState({ userName: text })}
                    ></TextInput>
                    <TextInput
                      key={"address" + item}
                      style={styles.inputText}
                      defaultValue={item.address}
                      multiline
                      editable={inputTrigger}
                      onChangeText={(text) => this.setState({ address: text })}
                    ></TextInput>
                    <TextInput
                      key={"phone" + item}
                      style={styles.inputText}
                      defaultValue={"0" + item.phone}
                      editable={inputTrigger}
                      onChangeText={(text) => this.setState({ phone: text })}
                    ></TextInput>
                    <TextInput
                      key={"userEmail" + item}
                      style={styles.inputText_disable}
                      defaultValue={item.userEmail}
                      editable={false}
                    ></TextInput>
                  </>
                ))}
              </View>
            </View>

            <View
              style={{ flexDirection: "row", marginTop: 20, marginLeft: 30}}
            >
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
  inputText_disable: {
  borderColor: "grey",
  borderRadius: 5,
  borderWidth: 1,

  fontSize: 15,
  fontWeight: "bold",
  textAlign: "auto",

  marginTop: 10,
  width: width * 0.65,
  padding: 5,
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
    marginRight: 15,

    borderRadius: 5,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderColor: "#61d47c",
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
  textField: {
    fontWeight: "bold",
    fontSize: width * 0.038,
    marginLeft: width * 0.03,
    marginTop: 10,
    padding: 10,
  },
  pageTitle: {
    color: COLORS.green,
    marginTop: height * 0.1,
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
});
