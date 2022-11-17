import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import COLORS from "../consts/colors";
import { auth } from "../../firebase";
const { width } = Dimensions.get("window");
const height = width * 0.6;
const quantity = 1;

function DetailScreen({ route, navigation }) {
  const item = route.params;
  const img = item.imgURL;
  const [quantity, setSelectedValue] = useState("1");
  const [isSubmit, setIsSubmit] = useState(false);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState(auth.currentUser?.email);
  const price = item.price;
  useEffect(() => {
    const authenticate = async () => {
      axios
        .post(
          "http://www.filmcamshop.com/api/orderProduct.php",
          JSON.stringify({
            product: item.productName,
            quantity: quantity,
            email: email,
            address: address,
            price: price,
          })
        )
        .then((response) => response.data)
        .then((responseJson) => {
          if (responseJson === "no") {
            alert("This product is out of stock!");

            navigation.navigate("Home");
          } else {
            alert(quantity + " product ordered!");
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

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={{
          backgroundColor: "#D9D9D9",
        }}
      >
        <View style={styles.header}>
          <Ionicons
            name="arrow-back-outline"
            size={28}
            onPress={() => navigation.goBack()}
          ></Ionicons>
          <Ionicons name="cart-outline" size={28}></Ionicons>
        </View>
        <Image
          style={{ height: height * 1.5, width: width, borderRadius: 0 }}
          source={{ uri: item.imgURL }}
        ></Image>
        <View style={styles.detailContainer}>
          <View
            style={{
              marginLeft: width * 0.07,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: width * 0.049,
                alignSelf: "center",
              }}
            >
              {item.productName}
            </Text>
            <View style={styles.priceTag}>
              <Text
                style={{
                  alignSelf: "center",
                  color: COLORS.white,
                  fontWeight: "bold",
                  padding: width * 0.03,
                  fontSize: width * 0.04,
                }}
                textBreakStrategy
              >
                {item.price} k VND
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontWeight: "bold",
              marginLeft: width * 0.07,
              fontSize: width * 0.049,
            }}
          >
            Còn lại: {item.quantity} sản phẩm
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: width * 0.049,
              marginLeft: width * 0.075,
            }}
          >
            About
          </Text>
          <Text
            style={{
              height: "30%",
              color: "grey",
              fontSize: width * 0.038,
              marginLeft: width * 0.075,
              marginRight: width * 0.075,
            }}
          >
            {item.productDescription}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: width * 0.04,
              marginLeft: width * 0.075,
              marginRight: width * 0.075,
            }}
          >
            Địa chỉ giao:
          </Text>

          <TextInput
            style={{ marginHorizontal: width * 0.02 }}
            placeholder="37 A đường Sinh Thái, Bến Cát, Bình Dương"
            onChangeText={(text) => setAddress(text)}
          ></TextInput>
          <View
            style={{
              marginTop: height * 0.1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: height * 0.06,
                justifyContent: "center",
                alignSelf: "center",
                height: height * 0.1,
              }}
            >
              Số Lượng:
            </Text>

            <Picker
              quantity={quantity}
              style={{
                height: height * 0.1,
                width: width * 0.2,
                size: height * 0.4,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
            </Picker>
            <TouchableOpacity
              style={styles.buyBtn}
              onPress={() => {
                if (email == null) {
                  alert("Please login to order product");
                  navigation.navigate("Home");
                } else {
                  setIsSubmit(true);
                }
              }}
            >
              <Text style={{ color: COLORS.white, fontSize: width * 0.05 }}>
                Add to cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyBtn}
              onPress={() => {
                if (email == null) {
                  alert("Please login to order product");
                  navigation.navigate("Home");
                } else {
                  setIsSubmit(true);
                }
              }}
            >
              <Text style={{ color: COLORS.white, fontSize: width * 0.05 }}>
                Buy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  buyBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 25,
    paddingHorizontal: width * 0.02,
    width: width * 0.25,
    fontSize: height * 0.15,
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
    maxWidth: width * 0.5,
    width: width * 0.3,
    backgroundColor: COLORS.green,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    height: height * 0.2,
    alignItems: "center",
  },
  header: {
    paddingTop: height * 0.15,
    paddingHorizontal: width * 0.05,
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
    height: height * 2,
    backgroundColor: COLORS.light,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: height / 17,
    marginTop: -height / 10,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
  },
});
export default DetailScreen;
