import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Linking,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HeaderSc from "./Header";
import { ScrollView } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const supportedURL = "https://www.facebook.com/FimCamShop";

const unsupportedURL = "slack://open?team=123456";
const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};
function AddressScreen() {
  return (
    <View
      style={{
        height: height * 2,
        backgroundColor: "#FFF",
      }}
    >
      <HeaderSc></HeaderSc>
      <ScrollView style={{ height: height * 2 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: height / 25,
            marginTop: height / 30,
            marginLeft: 15,
            alignSelf: "center",
            fontStyle: "italic",
          }}
        >
          Film Cam Shop
        </Text>
        <Image
          style={{
            marginVertical: height * 0.04,
            width: width * 0.5,
            height: width * 0.5,
            borderRadius: 200,
            alignSelf: "center",
          }}
          source={require("../../app/assets/logo.png")}
        ></Image>
        <Text
          style={{
            fontSize: 15,
            margin: height / 30,
            marginBottom: 0,
          }}
        >
          “Trong nhiếp ảnh, không có bóng tối nào là không thể sáng soi”{"\n"}
          Chào mừng các bạn đến với Film Cam Shop.{"\n"}
          Bạn là người mới tập chơi và đang tìm hiểu về nhiếp ảnh film? Bạn muốn
          tìm 1 máy film tốt để sử dụng? Đến với tiệm của tụi mình là một lựa
          chọn đúng đắn.{"\n"}
          Tiệm tụi mình chuyên cung cấp các thiết bị về nhiếp ảnh film, bao gồm
          máy và ống kính máy film, giấy film, và các phụ kiện đi kèm. Với
          phương châm Uy Tín và chất lượng sản phẩm được đưa lên hàng đầu cũng
          như các dịch vụ bảo hành hỗ trợ khách hàng cũng được tiệm đặc biệt chú
          trọng.
        </Text>
        <View style={{ margin: height / 30, marginTop: 0 }}>
          <Text style={{ fontSize: 15 }}>Phone Number: 0829 966 632</Text>
          <Text>Facebook: </Text>
          <OpenURLButton style={{ width: width / 10 }} url={supportedURL}>
            See in Facebook
          </OpenURLButton>
          <Text style={{ fontSize: 15 }}>
            Địa chỉ: 17/4 Bình Chuẩn 09, Bình Chuẩn, Thuận An, Bình Dương.
          </Text>
        </View>
      </ScrollView>
    </View>
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
export default AddressScreen;
