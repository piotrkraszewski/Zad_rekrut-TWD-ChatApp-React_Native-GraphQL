import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import { USER_AND_ROOMS } from '../Utils/Queris'
import ProfileSVG from "../assets/svg/profile.svg"
import SearchSVG from "../assets/svg/search.svg"
import RoomsSVG from "../assets/svg/rooms.svg"
import { useAppContext } from './Contexts/AppContext'


export default function ExchangeRates ({navigation}) {
  const { loading, error, data } = useQuery(USER_AND_ROOMS)
  const { userData, setUserData, setCurrentRoomID } = useAppContext()


  useEffect(() => {
    data && !userData && setUserData(user)
  }, [data])


  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Request Error</Text>

  const rooms = data.usersRooms.rooms
  const user = data.usersRooms.user


  const handleRoomClick = (index) => {
    setCurrentRoomID(rooms[index].id)
    navigation.navigate('Chat')
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rooms</Text>
        <View style={styles.svgsContainer}>
          <SearchSVG style={styles.svgIcon, {marginRight:8}}/>
          <RoomsSVG style={styles.svgIcon}/>
        </View>
      </View>

      {rooms.map((room, index) => (
        <View style={styles.roomContainer} key={room.id}>
        <TouchableHighlight
          id={room.id}
          style={styles.roomTouch}
          underlayColor='#bde0ff'
          onPress={() => handleRoomClick(index)}>

          <View style={styles.room} >
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

        </TouchableHighlight>
        </View>
      ))}

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
  roomContainer: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  roomTouch: {
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  room: {
    height: 90,
    width: '100%',
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