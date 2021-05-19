import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from './Utils/ApolloClient'
// import { AppLoading } from 'expo'
import Routes from './Utils/Routes'
import AppContext from './Components/Contexts/AppContext'
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
      <AppContext>
        <Routes/>
      </AppContext>
    </ApolloProvider>
  )
}
