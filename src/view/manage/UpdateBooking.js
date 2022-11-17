import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
const { width } = Dimensions.get("window");
import { Base64 } from "js-base64";
const height = width * 0.6;
import { Picker } from "@react-native-picker/picker";
export default class UpdateOrder extends React.Component {
  state = { ordertStatus: "" };
  updateOrdertStatus = (ordertStatus) => {
    this.setState({ ordertStatus: ordertStatus });
  };
  constructor(props) {
    super(props);
    this.state = {
      orderID: "",
      ordertStatus: "",
    };
  }

  checkInput = () => {
    const { orderID, ordertStatus } = this.state;

    if (orderID == "") {
      alert("Please enter ID");
    } else if (ordertStatus == "") {
      alert("Please enter status");
    } else {
      this.componentDidMount();
    }
  };

  componentDidMount() {
    const { orderID, ordertStatus } = this.state;

    return fetch("http://www.filmcamshop.com/api/orderStatus.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        // we will pass our input data to server
        orderId: orderID,
        orderstatus: ordertStatus,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === "ok") {
          alert("update order status successfuly!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View>
        <SafeAreaView>
          <Text style={styles.pageTitle}>Update Booking Status</Text>
        </SafeAreaView>
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
          keyboardType="numeric"
          maxLength={5}
          placeholder="Booking ID"
          onChangeText={(orderID) => this.setState({ orderID })}
        ></TextInput>

        <Picker
          style={{
            height: height * 0.1,
            width: width * 0.3,
            size: height * 0.5,
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
          selectedValue={this.state.ordertStatus}
          onValueChange={this.updateOrdertStatus}
        >
          <Picker.Item label="Approve" value="Packaging" />
          <Picker.Item label="Decline" value="Delivery" />
          <Picker.Item label="Completed" value="Successfull" />
        </Picker>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            borderRadius: 10,
            backgroundColor: "#fff",
            width: width / 2,
            marginTop: 15,
            padding: 10,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 4,
            borderBottomWidth: 4,
            borderColor: "#61d47c",
          }}
          onPress={this.checkInput}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
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

  pageTitle: {
    fontWeight: "bold",
    fontSize: 35,
    paddingBottom: height / 5,
  },

  pageTitle: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
    marginTop: 30,
  },
});
