import React, { useEffect, useState, useCallback } from 'react'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import { CHAT_INFO, SEND_MSG, CHAT_SUBSCRIPTION } from '../Utils/Queris'
import ProfileSVG from "../assets/svg/profile.svg"
import PhoneSVG from "../assets/svg/phone.svg"
import VideocallSVG from "../assets/svg/videocall.svg"
import ArrowSVG from "../assets/svg/arrow.svg"
import { GiftedChat } from 'react-native-gifted-chat'
import { useAppContext } from './Contexts/AppContext'


export default function ExchangeRates ({navigation}) {
  const { currentRoomID, userData } = useAppContext()
  const { loading, error, data } = useQuery(CHAT_INFO, {
    variables: {id: currentRoomID}
  })
  const [addMessage] = useMutation(SEND_MSG)
  // const { loading, error, data } = useSubscription(CHAT_SUBSCRIPTION, {
  //   variables: {roomId: currentRoomID}
  // })
  // console.log(data)

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if(data){
      const messages = []
      data.room.messages.map((message) => {
        messages.push({
          _id: message.id,
          text: message.body,
          createdAt: message.insertedAt,
          user: {
            _id: message.user.id,
            name: message.user.firstName,
            avatar: message.user.profilePic,
          }
        })
      })
      setMessages(messages)
    }
  }, [data])


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    addMessage({ variables: { body: messages[messages.length - 1].text, roomId: currentRoomID } })
  }, [])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Request Error</Text>

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

        { room.messages[0]
        ? <Image
          style={styles.roomImage}
          source={{uri: room.messages[0].user.profilePic}}
          resizeMode='cover' />
        : <ProfileSVG width={44} height={44} style={styles.roomImage}/>}

        <View style={styles.roomHeaderTexts}>
          <Text style={styles.roomName} numberOfLines={1}>
            The Widlarz Group
          </Text>
          <Text style={styles.roomStatus}>Active now</Text>
        </View>

        <View style={styles.svgsContainer}>
          <PhoneSVG style={styles.svgIcon, {marginRight:8}}/>
          <VideocallSVG style={styles.svgIcon}/>
        </View>
      </View>

      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        inverted={false}
        user={{
          _id: userData.id,
          name: userData.firstName,
          avatar: userData.profilePic,
        }}
      />

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
    marginRight: 10,
    marginLeft: 5,
  },
  roomHeaderTexts: {
    width: '45%',
    marginBottom: -6,
    marginRight: 8,
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
    fontSize: 15,
    lineHeight: 24,
    fontFamily: 'Poppins_600SemiBold',
  },
  roomStatus: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
  },
  message: {
    fontFamily: 'Poppins_400Regular',
  },
})