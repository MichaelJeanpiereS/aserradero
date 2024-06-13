import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc,getDoc, getFirestore,updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDrgugLkIT3Paink96rdj7RdYbaklWGfHU",
    authDomain: "aserradero-jyc.firebaseapp.com",
    projectId: "aserradero-jyc",
    storageBucket: "aserradero-jyc.appspot.com",
    messagingSenderId: "1041528899607",
    appId: "1:1041528899607:web:81c5dbc74ac460aeda7452"
    
};

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
export const save = (emp) => {
    addDoc(collection(db, 'AserraderoJyC'), emp)
}
export const getData = (data) => {
    onSnapshot(collection(db, 'AserraderoJyC'), data)
}

export const remove = (id) => {
    deleteDoc(doc(db, 'AserraderoJyC', id))
}

export const getDocumento = (id) => getDoc(doc(db,'AserraderoJyC',id))

export const update = (id,AserraderoJyC) =>{
    updateDoc(doc(db,'AserraderoJyC', id),AserraderoJyC)
}