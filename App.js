import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { ApolloProvider } from '@apollo/client'
import { client } from './ApolloClient'
import Rooms from './Rooms'


export default function App() {
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
    backgroundColor: '#dadada',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
