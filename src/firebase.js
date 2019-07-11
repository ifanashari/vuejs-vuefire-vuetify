import { initializeApp } from 'firebase'
import 'firebase/firestore'

const app = initializeApp ({
    apiKey: "AIzaSyD3uYBeFvCxsv7OFlXaX5jtSN7STHIqC4A",
    authDomain: "dormapp-f23a9.firebaseapp.com",
    databaseURL: "https://dormapp-f23a9.firebaseio.com",
    projectId: "dormapp-f23a9",
    storageBucket: "dormapp-f23a9.appspot.com",
    messagingSenderId: "390701570069"
})

export const userAuth = app.auth()
app.firestore().settings({
    timestampsInSnapshots: true
})
export const roomsCol = app.firestore().collection('rooms')
export const userCol = app.firestore().collection('user')