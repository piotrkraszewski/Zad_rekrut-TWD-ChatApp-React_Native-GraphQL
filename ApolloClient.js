import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { EXPO_TOKEN, EXPO_API_URL } from '@env'


const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization:`Bearer ${EXPO_TOKEN}`
    }
  }
})

const httpLink = createHttpLink({
  uri: EXPO_API_URL
})


export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})