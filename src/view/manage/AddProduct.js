import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from "react-native";
// import ImagePicker from "react-native-image-crop-picker";
import axios from "axios";
import COLORS from "../../consts/colors";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("screen");

function UpdateProduct({ navigation }) {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      axios
        .post(
          "http://www.filmcamshop.com/api/AddProduct.php",
          JSON.stringify({
            name: name,
            des: des,
            quantity: quantity,
            brand: brand,
            type: type,
            image: image,
          })
        )
        .then((response) => response.data)
        .then((responseJson) => {
          if (responseJson === "ok") {
            alert("Add Success!");
            navigation.navigate("ProductManage");
          } else {
            alert("Try again");
            navigation.navigate("ProductManage");
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

        <View>
          <Text style={styles.pageTitle}>Film Cam Shop</Text>
        </View>

        <View style={{ marginTop: height * 0.05 }}>
          <TextInput
            style={styles.inputText}
            placeholder="Product Name"
            onChangeText={(text) => setName(text)}
          ></TextInput>

          <TextInput
            style={styles.inputText}
            placeholder="Description"
            multiline
            onChangeText={(text) => setDes(text)}
          ></TextInput>

          <TextInput
            style={styles.inputText}
            placeholder="Quantity"
            keyboardType="numeric"
            onChangeText={(text) => setQuantity(text)}
          ></TextInput>
          <TextInput
            style={styles.inputText}
            placeholder="Brand"
            onChangeText={(text) => setBrand(text)}
          ></TextInput>
          <TextInput
            style={styles.inputText}
            placeholder="Type"
            onChangeText={(text) => setType(text)}
          ></TextInput>
          <TextInput
            style={styles.inputText}
            placeholder="ImageUrl"
            onChangeText={(text) => setImage(text)}
          ></TextInput>
          <TouchableOpacity
            style={styles.buttonMenuTop}
            onPress={() => {
              setIsSubmit(true);
            }}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
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
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: width / 2,
    height: height * 0.05,
    marginTop: 15,
    padding: 10,
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
    height: height * 0.2,
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
  pageTitle: {
    color: COLORS.green,
    paddingTop: height * 0.1,
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
  productName: {
    paddingTop: 15,
    paddingLeft: 5,
    fontSize: height / 10,
    fontWeight: "bold",
  },
});
export default UpdateProduct;
