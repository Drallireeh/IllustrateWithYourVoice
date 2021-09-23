import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, getDoc, getDocs, doc, collection } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYDzrXPRWSBXih1_H6PBS9qHXvXZ7fhjM",
    authDomain: "illustratewithyourvoice.firebaseapp.com",
    projectId: "illustratewithyourvoice",
    storageBucket: "illustratewithyourvoice.appspot.com",
    messagingSenderId: "709024441258",
    appId: "1:709024441258:web:7147db4d2e855816cbc1d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get firestore database
const db = getFirestore();

const querySnapshot = await getDocs(collection(db, "images"));
querySnapshot.forEach((doc) => {
    const { name, url } = doc.data();
    console.log(name, url)
});

$( document ).ready(function() {
    var settingsDiplayed = false
    $('#settings > i').click(function() {
     if (settingsDiplayed == true){
         $('#settings > ul').css("visibility", "hidden");
         settingsDiplayed = false;
     } else {
         $('#settings > ul').css("visibility", "initial");
         settingsDiplayed = true;
     }
 })});