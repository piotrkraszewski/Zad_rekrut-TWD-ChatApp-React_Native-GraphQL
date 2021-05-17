import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Text, View } from 'react-native'

const EXCHANGE_RATES = gql`
  query {
	usersRooms{
    user {
      email
      firstName
      lastName
      id
      role
    }
    rooms {
      id
      name
    }
  }
}
`
export default function ExchangeRates () {
  const { loading, error, data } = useQuery(EXCHANGE_RATES)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Request Error</Text>

  console.log(data.usersRooms)

  return(
    <View>
      <Text>
        {/* {data.userRooms.user.email} */}
        helo
      </Text>
    </View>
  )
}
