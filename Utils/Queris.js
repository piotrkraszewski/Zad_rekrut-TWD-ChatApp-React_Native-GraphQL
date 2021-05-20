import { gql } from '@apollo/client'

export const USER_AND_ROOMS = gql`
  query {
    usersRooms{
      user {
        email
        firstName
        lastName
        id
        role
        profilePic
      }
      rooms {
        id
        name
        roomPic
      }
    }
  }
`

export const CHAT_INFO = gql`
  query chatInfo($id: String!) {
    room(id: $id) {
      messages {
        id
        body
        user {
          id
          firstName
          profilePic
        }
        insertedAt
      }
      name
      roomPic
    }
  }
`

export const SEND_MSG = gql`
  mutation ($body:String!, $roomId:String!){
    sendMessage(body: $body, roomId: $roomId){
      body
      id
      insertedAt
      user{
        id
      }
    }
  }
`

export const CHAT_SUBSCRIPTION = gql`
  subscription($roomId:String!) {
    messageAdded(roomId: $roomId){
      body
      id
      insertedAt
      user{
        id
      }
    }
  }
`