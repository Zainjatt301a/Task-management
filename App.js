import React, { useEffect } from 'react'
import { View } from 'react-native'
import Navigation from './src/navigation'
import firebase from 'firebase'
const App = () => {

  useEffect(() => {
    initialApp()
  }, [])

  const initialApp = () => {

    const firebaseConfig = {
      apiKey: "AIzaSyAmgIT7DjOPksZKzB4kK1ezxGdKTwPQppQ",
      authDomain: "employee-app-418aa.firebaseapp.com",
      projectId: "employee-app-418aa",
      storageBucket: "employee-app-418aa.appspot.com",
      messagingSenderId: "293921556159",
      appId: "1:293921556159:web:ad4ba8c46317aa001ba80a",
      measurementId: "G-WSLTZE381D"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
    </View>
  )
}

export default App