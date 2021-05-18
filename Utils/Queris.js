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
        }
        insertedAt
      }
      name
      user {
        id
      }
      roomPic
    }
  }
`