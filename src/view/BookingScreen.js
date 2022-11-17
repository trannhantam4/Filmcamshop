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
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import COLORS from "../consts/colors";
import HeaderSc from "./Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

function BookingScreen(navigation, route) {
  const [selectedValue, setSelectedValue] = useState("Đám cưới");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [address, setAddress] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      axios
        .post(
          "http://www.filmcamshop.com/api/bookingPhotoshoot.php",
          JSON.stringify({
            text: text,
            selectedValue: selectedValue,
            address: address,
          })
        )
        .then((Response) => Response.data)
        .catch((error) => {
          alert("Error " + error);
        });
    };
    if (isSubmit) authenticate();
  }, [isSubmit]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = "Date: " + a``;
    tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime = "Time: " + tempDate.getHours() + "h " + tempDate.getMinutes();
    setText(fDate + " \n" + fTime);
    console.log(fDate + " " + fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  return (
    <SafeAreaView style={{}}>
      <KeyboardAwareScrollView>
        <HeaderSc></HeaderSc>
        <ImageBackground
          style={{ width: width, height: height }}
          source={require("../../app/assets/market.png")}
        >
          <Text style={styles.pageTitle}>Đặt lịch</Text>
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
            <Text style={styles.pickDate}>{text}</Text>
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
              <Text style={styles.buttonText}>Date</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={showTimepicker}>
              <Text style={styles.buttonText}>Time</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                minimumDate={new Date()}
              />
            )}
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
                }
              >
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
              onChange={(text) => setAddress(text)}
            ></TextInput>
            <View style={{ alignContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setIsSubmit(true);
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
  pickDate: {
    color: "#61d47c",
    paddingTop: height / 30,
    height: height / 10,
    fontWeight: "bold",
    fontSize: height / 50,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
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
    paddingTop: height / 15,
    paddingLeft: width / 15,
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
export default BookingScreen;
