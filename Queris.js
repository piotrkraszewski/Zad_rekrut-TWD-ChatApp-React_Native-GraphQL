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