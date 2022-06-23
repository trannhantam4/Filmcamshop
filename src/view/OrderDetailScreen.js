import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  Picker,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView
} from "react-native";
const { width } = Dimensions.get("window");
import { Base64 } from "js-base64";
const height = width * 0.6;


export default class OrderDetailScreen extends React.Component {

  constructor(props){
		super(props)
		this.state={
			orderID:'',
			ordertStatus:'',

		}
    // this.userLogin = this.userLogin.bind(this);
    // this.adminLogin = this.adminLogin.bind(this);

	}


  checkInput = () =>{
    const {orderID,ordertStatus} = this.state;
  
    if(orderID==""){
      alert("Please enter ID");
      
    }
    else if(ordertStatus==""){
      alert("Please enter status");
      
    } else {
    this.componentDidMount();
  }
  
  }

componentDidMount() {
  const {orderID,ordertStatus} = this.state;

  return fetch("http://www.filmcamshop.com/api/orderStatus.php",{ 
  method:'post',
  header:{
    'Accept': 'application/json',
    'Content-type': 'application/json'
  },
  body:JSON.stringify({
    // we will pass our input data to server
    orderId: orderID,
    orderstatus: ordertStatus

  })})
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson === "ok"){
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
      <Text style={styles.pageTitle}>Update Order List</Text>
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
        keyboardType='numeric'
        maxLength={5}
        placeholder="Order ID"
        onChangeText={orderID => this.setState({orderID})}
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
        placeholder="order status"
        onChangeText={ordertStatus => this.setState({ordertStatus})}
    ></TextInput>

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
  pageTitle: {
    fontWeight: 'bold',
    fontSize: 35,
    textAlign: 'center',
    marginTop: 30,
  },
});
