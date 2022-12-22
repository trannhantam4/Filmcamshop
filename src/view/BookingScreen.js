import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import COLORS from "../consts/colors";
import { auth } from "../../firebase";
import HeaderSc from "./Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

function BookingScreen(navigation, route) {
  const [selectedValue, setSelectedValue] = useState("Đám cưới");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [email] = useState(auth.currentUser?.email);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      let result = await axios
        .post(
          "http://www.filmcamshop.com/api/bookingPhotoshoot.php",
          JSON.stringify({
            date: date,
            selectedValue: selectedValue,
            address: address,
            email: email,
          })
        )

        .then((Response) => Response.data)
        .then((responseJson) => {
          if (responseJson === "no") {
            alert("Error");
          } else {
            alert("Photoshoot booked!");

            setIsSubmit(false);
          }
        })
        .catch((error) => {
          alert(error);
          setIsSubmit(false);
        });
    };
    if (isSubmit) {
      authenticate();
    }
  }, [isSubmit]);

  return (
    <SafeAreaView style={{}}>
      <KeyboardAwareScrollView>
        <HeaderSc></HeaderSc>
        <ImageBackground
          style={{ width: width, height: height }}
          source={require("../../app/assets/market.png")}
        >
          <Text style={styles.pageTitle}>Đặt Lịch Chụp Ảnh</Text>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: 40,
              width: width * 0.7,
              height: height / 2,
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <Text
              adjustsFontSizeToFit
              style={{ marginTop: height * 0.02, fontWeight: "bold" }}
            >
              Date:
            </Text>
            <TextInput
              style={{
                margin: height * 0.02,
                borderWidth: 2,
                padding: height * 0.01,
                borderRadius: 5,
                borderColor: COLORS.green,
              }}
              placeholder="DD/MM/YYYY Example 18/12/2022"
              onChangeText={(text) => setDate(text)}
            ></TextInput>
            <View
              style={{
                alignContent: "center",
                alignItems: "center",
                color: COLORS.green,
              }}
            >
              <Picker
                selectedValue={selectedValue}
                style={{
                  height: height / 10,
                  width: width / 2.5,
                  marginTop: 10,
                  color: COLORS.green,
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }>
                <Picker.Item label="Đám Cưới" value="Wedding" />
                <Picker.Item label="Chân Dung" value="Portrial" />
                <Picker.Item label="Thương Mại" value="Commercial" />
                <Picker.Item label="Ảnh Gia Đình" value="Family" />
                <Picker.Item label="Phong Cảnh" value="Landscape" />
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Address"
              onChangeText={(text) => setAddress(text)}
            ></TextInput>
            <View style={{ alignContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (email == null) {
                    alert("Please login to book a photoshoot");
                    navigation.navigate("Home");
                  } else if(address.length>10){
                    setIsSubmit(true);
                  } else{
                    alert("Your address length is not enough!")
                  }
                }}
              >
                <Text style={styles.buttonText}>Đặt lịch</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    borderColor: "grey",
    width: width * 0.6,
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 10,
    fontSize: height / 40,
    height: height / 15,
    fontWeight: "bold",
    borderWidth: 1,

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
  pageTitle: {
    fontWeight: "bold",
    fontSize: 35,
    paddingTop: height / 20,
    textAlign: "center",
    marginBottom: width * 0.3,
  },
});
export default BookingScreen;
