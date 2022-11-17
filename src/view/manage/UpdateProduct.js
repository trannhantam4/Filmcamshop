import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import axios from "axios";
import COLORS from "../../consts/colors";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width } = Dimensions.get("window");

const height = width * 0.6;

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
    height: height * 0.22,
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
export default function UpdateProduct({ navigation, route }) {
  const [Id, setId] = useState("");
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const data = route.pagrams;
  useEffect(() => {
    const authenticate = async () => {
      axios
        .post(
          "http://www.filmcamshop.com/api/UpdateProduct.php",
          JSON.stringify({
            Id: Id,
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
            alert("Update Success!");

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
        placeholder={"id"}
        onChangeText={(text) => setId(text)}
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
        placeholder="Product Name"
        onChangeText={(text) => setName(text)}
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
        placeholder="Description"
        onChangeText={(text) => setDes(text)}
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
        placeholder="Quantity"
        onChangeText={(text) => setQuantity(text)}
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
        placeholder="Brand"
        onChangeText={(text) => setBrand(text)}
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
        placeholder="Type"
        onChangeText={(text) => setType(text)}
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
        placeholder="ImageUrl"
        onChangeText={(text) => setImage(text)}
      ></TextInput>
      <TouchableOpacity
        style={styles.buttonMenuTop}
        onPress={() => {
          setIsSubmit(true);
        }}
      >
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}
