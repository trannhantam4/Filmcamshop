import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Alert,
  SafeAreaView,
} from "react-native";
import HeaderSc from "../Header";
import { Picker } from "@react-native-picker/picker";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");
import COLORS from "../../consts/colors";

export default class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: "",
      productName: "",
      Description: "",
      Quantity: "",
      Brand: "",
      Type: "",
      Status: "disable",

      productID_temp: props.route.params.productID,
      productName_temp: props.route.params.productName,
      Description_temp: props.route.params.productDescription,
      Quantity_temp: props.route.params.quantity,
      Brand_temp: props.route.params.productBrand,
      Type_temp: props.route.params.productType,
      Status_temp: props.route.params.status,

      category_brand: [
        "Nikon",
        "Olympus",
        "Canon",
        "Fujifilm",
        "Pentax",
        "Minolta",
      ],
    };
  }

  checkInput = () => {
    this.componentDidMount();

    Alert.alert("Update Product", "Update this product successfully!");
  };

  disableProduct_Component = () => {
    const { Status } = this.state;
    this.componentDidMount(Status);
    Alert.alert("Disable Product", "Disable this product successfully.");
  };

  disableProduct = () => {
    const { Status_temp } = this.state;
    if (Status_temp === "active") {
      Alert.alert("Disable Product?", "Do you want to disable this product?", [
        { text: "YES", onPress: this.disableProduct_Component },
        { text: "CANCLE" },
      ]);
    } else {
      Alert.alert("Disable Product?", "This product is already deleted!", [
        { text: "OK" },
      ]);
    }
  };

  componentDidMount(Status) {
    const {
      productID,
      productName,
      Description,
      Quantity,
      Brand,
      Type,

      productID_temp,
      Status_temp,
    } = this.state;
    this.setState({ productID: productID_temp });

    return fetch("http://www.filmcamshop.com/api/UpdateProduct.php", {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: productID,
        proName: productName,
        description: Description,
        quantity: Quantity,
        brand: Brand,
        type: Type,

        status: Status,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === "ok") {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const {
      productName_temp,
      Description_temp,
      Quantity_temp,
      Brand_temp,
      Type_temp,
      Status_temp,

      Status,
      productName,
      Description,
      Quantity,
      Brand,
      Type,
    } = this.state;

    return (
      <SafeAreaView
        style={{
          width: width,
          height: height,
        }}>
        <ImageBackground
          style={{ width: width, height: height }}
          source={require("../../../app/assets/logo_wallpaper_2.png")}
        >
          <View >
            <Text style={styles.pageTitle}>Film Cam Shop</Text>
          </View>

          <View style={{ marginTop: height * 0.04}}>
            <TextInput
              style={styles.inputText}
              defaultValue={productName_temp}
              onChangeText={(text) => this.setState({ productName: text })}
            ></TextInput>

            <TextInput
              style={styles.inputText}
              defaultValue={Status_temp}
              onChangeText={(text) => this.setState({ Status_temp: text })}
            ></TextInput>

            <TextInput
              style={styles.inputText}
              multiline
              onChangeText={(text) => this.setState({ Description: text })}
              defaultValue={Description_temp}
              editable
            ></TextInput>

            <TextInput
              style={styles.inputText}
              defaultValue={Quantity_temp}
              onChangeText={(text) => this.setState({ Quantity: text })}
            ></TextInput>

            <Picker
              style={styles.inputText}
              selectedValue={this.state.Brand_temp}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ selectedValue: itemValue });
              }}
            >
              {this.state.category_brand.map((item, index) => (
                <Picker.Item label={item} value={item} key={index} />
              ))}
            </Picker>

            <TextInput
              style={styles.inputText}
              defaultValue={Type_temp}
              onChangeText={(text) => this.setState({ Type: text })}
            ></TextInput>

          <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: width,
            height: height * 0.2,
          }}>
            <TouchableOpacity
              style={styles.buttonMenuTop}
              onPress={this.checkInput}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonMenuTop} onPress={this.disableProduct}>
              <Text style={styles.buttonText}>Disable Product</Text>
            </TouchableOpacity>
          </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
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
    color: COLORS.green,
    paddingTop: height * 0.1,
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
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
    alignSelf: "center",
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
    borderColor: "grey",
    padding: 10,
    width: width * 0.8,
    borderRadius: 5,
    fontSize: 15,
    fontWeight: "bold",
    borderWidth: 1,
    alignContent: "center",
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: COLORS.white,
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
});
