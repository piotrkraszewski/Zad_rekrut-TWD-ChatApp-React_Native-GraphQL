import React from 'react'
import { useQuery } from '@apollo/client'
import { StyleSheet, Text, View, Image } from 'react-native'
import { USER_AND_ROOMS } from './Queris'
import ProfileSVG from "./assets/svg/profile.svg"
import SearchSVG from "./assets/svg/search.svg"
import RoomsSVG from "./assets/svg/rooms.svg"

export default function ExchangeRates () {
  const { loading, error, data } = useQuery(USER_AND_ROOMS)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Request Error</Text>

  console.log(data.usersRooms.rooms)
  const rooms = data.usersRooms.rooms
  console.log(rooms)
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rooms</Text>
        <View style={styles.svgsContainer}>
          <SearchSVG style={styles.svgIcon, {marginRight:8}}/>
          <RoomsSVG style={styles.svgIcon}/>
        </View>
      </View>

      <View style={styles.rooms}>
        {rooms.map(room => (
          <View style={styles.room} key={room.id}>

            { room.roomPic
            ? <Image
              style={styles.roomImage}
              source={{uri: room.roomPic}}
              resizeMode='cover' />
            : <ProfileSVG style={styles.roomImage}/>}

            <View style={styles.roomTexts}>
              <Text style={styles.roomTime}>10 m ago</Text>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.roomMessage}>Sample message</Text>
            </View>

          </View>
        ))}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#dadada',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 125,
    backgroundColor: '#B6DEFD',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 25,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 36,
    color: '#5603AD',
    includeFontPadding:false
  },
  svgsContainer: {
    flexDirection: 'row',
  },
  svgIcon: {
    width: 44,
    height: 44,
  },
  rooms: {
    width: '100%',
  },
  room: {
    height: 90,
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
  },
  roomImage: {
    width: 64,
    height: 64,
    borderRadius: 50,
    marginRight: 16,
  },
  roomTexts: {
    width: '80%',
    justifyContent: 'center',
  },
  roomTime: {
    marginLeft: 'auto',
    marginRight: 8,
    marginBottom: -8,
    fontSize: 10,
    color: '#9FA2B2',
  },
  roomName: {
    width: '79%',
    fontFamily: 'Poppins_500Medium',
  },
  roomMessage: {
    fontFamily: 'Poppins_400Regular',
  },
  message: {
    fontFamily: 'Poppins_400Regular',
  },
})