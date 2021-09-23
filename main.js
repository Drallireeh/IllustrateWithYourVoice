import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

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

/**
 * We get all our database image and check if what we search is already inside to avoid api call
 * @returns Array which contains an object with pair name/url from our database
 */
async function getDbImages() {
    let array = [];
    const querySnapshot = await getDocs(collection(db, "images"));
    // Get all documents inside collection 'images' and get their name and url path
    querySnapshot.forEach((doc) => {
        const { name, url } = doc.data();
        array.push({ name: name, url: url })
    });

    return array;
}

/**
 * Add image to our database
 * @param {string} name image name (search type + options)
 * @param {string} url image url 
 */
async function addDbImage(name, url) {
    await addDoc(collection(db, "images"), {
        name: name,
        url: url,
    });
}

export { getDbImages };
export { addDbImage };