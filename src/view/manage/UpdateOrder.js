import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import {
  View,
  Picker,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from "react-native";
const { width } = Dimensions.get("window");
const height = width * 0.6;




export default class UpdateOrder extends React.Component {

  constructor(props){
    super(props)
    this.state={
      ordertStatus:'',
      orderID:'',
      productName:props.route.params.productName,
      quantity:props.route.params.quantity,
      order_temp:props.route.params.orderID,
      address:props.route.params.address,
      ordertStatus:props.route.params.orderDetail,
    }

  }

  state = {ordertStatus: ''}
  updateOrdertStatus = (ordertStatus) => {
     this.setState({ ordertStatus: ordertStatus })
  }


  checkInput = () =>{
    const {orderID,ordertStatus,order_temp} = this.state;
  
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
  const {ordertStatus, orderID, order_temp} = this.state;
  this.setState({ orderID: order_temp})

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
  const {orderID, ordertStatus, productName, quantity, address} = this.state;

  return (
    
    <View>
      <SafeAreaView>
        <Text style={styles.pageTitle}>Order Detail</Text>
      </SafeAreaView>

      <View>
        <Text>
          Order Information
        </Text>
        <Text style={{
          fontSize: width * 0.038,
          fontSize: width * 0.049,
          marginLeft: width * 0.075,}}>
          {(address)}
        </Text>
      </View>

      <View>
        <Text style={styles.pageTitle}>{(productName)}</Text>
      </View>

      <SafeAreaView>
        <Text style={styles.pageTitle}>{(quantity)}</Text>
      </SafeAreaView>


      {/* <TextInput
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
        // onChangeText={orderID => this.setState({orderID})}
      ></TextInput> */}

      <Picker

        style={{
          height: height * 0.1,
          width: width * 0.3,
          size: height * 0.5,
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
        selectedValue = {this.state.ordertStatus} onValueChange = {this.updateOrdertStatus}
      >
        <Picker.Item label="Packaging" value="Packaging" />
        <Picker.Item label="Delivery" value="Delivery" />
        <Picker.Item label="Successfull" value="Successfull" />
      </Picker>

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
