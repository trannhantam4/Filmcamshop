import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Picker,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
const { width } = Dimensions.get("window");
const height = width * 0.6;

function BookingScreen() {
  const [selectedValue, setSelectedValue] = useState("Đám cưới");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      axios
        .post(
          "http://www.filmcamshop.com/api/bookingPhotoshoot.php",
          JSON.stringify({
            text: text,
            selectedValue: selectedValue,
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
    let fDate =
      "Date: " +
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
    <SafeAreaView style={{ marginTop: 30, marginLeft: 10 }}>
      <Text style={styles.pageTitle}>Đặt lịch</Text>
      <Text style={styles.buttonText}>{text}</Text>
      <View style={{ alignContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.button} onPress={showDatepicker}>
          <Text style={styles.buttonText}>Chọn Ngày</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.button} onPress={showTimepicker}>
          <Text style={styles.buttonText}>Chọn Giờ</Text>
        </TouchableOpacity>
      </View>
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
      <View style={{ alignContent: "center", alignItems: "center" }}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150, marginTop: 10 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Đám Cưới" value="Wedding" />
          <Picker.Item label="Chân Dung" value="Portrial" />
          <Picker.Item label="Thương Mại" value="Commercial" />
          <Picker.Item label="Ảnh Gia Đình" value="Family" />
          <Picker.Item label="Phong Cảnh" value="Landscape" />
        </Picker>
      </View>

      <View style={{ alignContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setIsSubmit(true);
            alert("We will send confirm email for you later");
          }}
        >
          <Text style={styles.buttonText}>Đặt lịch</Text>
        </TouchableOpacity>
      </View>
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
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowColor: "gray",
    textAlign: "center",
    flexDirection: "column",
    width: "28%",
    backgroundColor: "#fff",
    padding: 10,
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
export default BookingScreen;
