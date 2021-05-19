import React, { useEffect, useState, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import { CHAT_INFO } from '../Utils/Queris'
import ProfileSVG from "../assets/svg/profile.svg"
import PhoneSVG from "../assets/svg/phone.svg"
import VideocallSVG from "../assets/svg/videocall.svg"
import ArrowSVG from "../assets/svg/arrow.svg"
import { GiftedChat } from 'react-native-gifted-chat'


export default function ExchangeRates ({navigation}) {
  const { loading, error, data } = useQuery(CHAT_INFO, {
    variables: {id: "2d011ef0-487d-4f26-ba8e-a9a5a28ff908"}
  })
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    data && setMessages(room.messages)
  }, [data])
  useEffect(() => console.log('messages', messages), [messages])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Request Error</Text>

  // console.log(data.room.messages)
  const room = data.room
 //--------------------------------------


  return(
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableHighlight
        style={{
          padding: 5,
          marginLeft: -5,
          borderRadius: 50,
        }}
        // style={styles.roomTouch}
        underlayColor='#a6cce7'
        onPress={() => {navigation.navigate('Rooms')}}
      >
        <ArrowSVG
          style={{
            fill: 'black',
            height: 28,
            width: 28,
            marginBottom: 2,
          }}
        />
      </TouchableHighlight>

        { room.roomPic
        ? <Image
          style={styles.roomImage}
          source={{uri: room.roomPic}}
          resizeMode='cover' />
        : <ProfileSVG style={styles.roomImage}/>}

        <View style={styles.roomHeaderTexts}>
          <Text style={styles.roomName} numberOfLines={1}>
            {room.name.substr(13)}
          </Text>
          <Text style={styles.roomStatus}>Active now</Text>
        </View>

        <View style={styles.svgsContainer}>
          <PhoneSVG style={styles.svgIcon, {marginRight:8}}/>
          <VideocallSVG style={styles.svgIcon}/>
        </View>
      </View>

      {/* <GiftedChat
        // key={room.messages.id}
        messages={messages}
        // onSend={messages => onSend(messages)}
        user={{
          _id: room.user.id,
          name: 'Ginny'
        }}
      /> */}

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
    width: 44,
    height: 44,
    borderRadius: 50,
    marginRight: 16,
    marginLeft: 5,
  },
  roomHeaderTexts: {
    width: '43%',
    marginBottom: -8,
    marginRight: 12,
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