import React from 'react'
import { useQuery } from '@apollo/client'
import { StyleSheet, Text, View, Image } from 'react-native'
import { USER_AND_ROOMS } from './Queris'
import ProfileSVG from "./assets/svg/profile.svg";

export default function ExchangeRates () {
  const { loading, error, data } = useQuery(USER_AND_ROOMS)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Request Error</Text>

  console.log(data.usersRooms.rooms)
  const rooms = data.usersRooms.rooms
  console.log(rooms)
  return(
    <View style={styles.container}>
      {rooms.map(room => (
        <View style={styles.room} key={room.id}>
            { room.roomPic ? <Image
              style={styles.image}
              source={{uri: room.roomPic}}
              resizeMode='cover' />
            : <ProfileSVG width={64} height={64}/>}

          <Text style={styles.roomName}>{room.name}</Text>
        </View>
      ))}
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dadada',
    alignItems: 'center',
    justifyContent: 'center',
  },
  room: {
    height: 90,
    width: '100%',

    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 50
  },
  roomName: {
    fontFamily: 'Poppins_500Medium',
  },
  message: {
    fontFamily: 'Poppins_400Regular',
  },
})