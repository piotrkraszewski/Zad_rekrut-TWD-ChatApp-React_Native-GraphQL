import React from 'react'
import { useQuery } from '@apollo/client'
import { StyleSheet, Text, View, Image } from 'react-native'
import { CHAT_INFO } from '../Utils/Queris'
import ProfileSVG from "../assets/svg/profile.svg"
import PhoneSVG from "../assets/svg/phone.svg"
import VideocallSVG from "../assets/svg/videocall.svg"

export default function ExchangeRates () {
  const { loading, error, data } = useQuery(CHAT_INFO, {
    variables: {id: "2d011ef0-487d-4f26-ba8e-a9a5a28ff908"}
  })

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Request Error</Text>

  console.log(data.room.name)
  const room = data.room

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        { room.roomPic
          ? <Image
            style={styles.roomImage}
            source={{uri: room.roomPic}}
            resizeMode='cover' />
          : <ProfileSVG style={styles.roomImage}/>}

          <View style={styles.roomHeaderTexts}>
            <Text style={styles.roomName}>{room.name.substr(17)}</Text>
            <Text style={styles.roomStatus}>Active now</Text>
          </View>

        <View style={styles.svgsContainer}>
          <PhoneSVG style={styles.svgIcon, {marginRight:8}}/>
          <VideocallSVG style={styles.svgIcon}/>
        </View>
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
  roomHeaderTexts: {
    width: '50%',
    marginBottom: -8,
    padding: 0,
    justifyContent: 'flex-end',
  },
  roomTime: {
    marginLeft: 'auto',
    marginRight: 8,
    marginBottom: -8,
    fontSize: 10,
    color: '#9FA2B2',
  },
  roomName: {
    color: '#5603AD',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  roomStatus: {
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
  },
  message: {
    fontFamily: 'Poppins_400Regular',
  },
})