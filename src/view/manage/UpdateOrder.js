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
import HeaderSc from "../Header";
import COLORS from "../../consts/colors";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

export default class UpdateOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderStatus: "",
      orderID: "",
      productName: props.route.params.productName,
      quantity: props.route.params.quantity,
      order_temp: props.route.params.orderID,
      address: props.route.params.address,
      orderStatus_temp: props.route.params.orderDetail,
      orderStatus_display: props.route.params.orderDetail,
      userEmail: props.route.params.userEmail,
    };
  }

  updateorderStatus = (orderStatus) => {
    this.setState({ orderStatus: orderStatus });
    this.setState({ orderStatus_display: orderStatus });
  };

  checkInput = () => {
    const { orderStatus_temp, orderStatus } = this.state;
    if (orderStatus == "") {
      alert("Please chose status");
    } else {
      this.componentDidMount();
    }
  };

  componentDidMount() {
    const { orderStatus, orderID, order_temp } = this.state;
    this.setState({ orderID: order_temp });

    return fetch("http://www.filmcamshop.com/api/orderStatus.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderID,
        orderstatus: orderStatus,
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
    const { orderStatus, productName, quantity, address, userEmail } =
      this.state;

    return (
      <SafeAreaView>
        <ImageBackground
          style={{ width: width, height: height }}
          source={require("../../../app/assets/logo_wallpaper_2.png")}
        >
          <HeaderSc></HeaderSc>
          <View>
            <Text style={styles.pageTitle}>Order Detail</Text>

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
                  Product:
                </Text>
                <Text style={styles.textField}>Quantity:</Text>
                <Text style={styles.textField}>Order Status:</Text>
              </View>

              <View>
                <TextInput
                  style={styles.inputText}
                  defaultValue={userEmail}
                  editable={false}
                ></TextInput>

                <TextInput
                  style={styles.inputText}
                  defaultValue={address}
                  multiline
                  editable={false}
                ></TextInput>

                <TextInput
                  style={styles.inputText}
                  defaultValue={productName}
                  editable={false}
                ></TextInput>

                <TextInput
                  style={styles.inputText}
                  defaultValue={quantity}
                  editable={false}
                ></TextInput>
                <Picker
                  style={styles.picker}
                  selectedValue={this.state.orderStatus_display}
                  onValueChange={this.updateorderStatus}
                  mode={"dropdown"}
                >
                  <Picker.Item label="Packaging" value="Packaging" />
                  <Picker.Item label="Delivery" value="Delivering" />
                  <Picker.Item label="Successful" value="Successful" />
                </Picker>
              </View>
            </View>

            <TouchableOpacity
              style={styles.buttonMenuTop}
              onPress={this.checkInput}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
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
