import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { ApolloProvider } from '@apollo/client'
import { client } from './Utils/ApolloClient'
import Rooms from './Components/Rooms'
// import { AppLoading } from 'expo'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'


export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Rooms/>
      </View>
    </ApolloProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
})
