import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Rooms from '../Components/Rooms'
import Chat from '../Components/Chat'

const Stack = createStackNavigator()

export default function Routes() {
  return (
    <View style={styles.appContainer}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{header: () => null}}
          initialRouteName='Rooms'
        >
          <Stack.Screen name="Rooms" component={Rooms} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    height: '100%',
    backgroundColor: '#dadada',
  },
})
