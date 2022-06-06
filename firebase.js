// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx36eODnYshHXBWPvHIMO2YXMMsZUC8AM",
  authDomain: "filmcamshop-badfc.firebaseapp.com",
  projectId: "filmcamshop-badfc",
  storageBucket: "filmcamshop-badfc.appspot.com",
  messagingSenderId: "469614461177",
  appId: "1:469614461177:web:b9974bb11f7817bd3de228",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
export { auth };
