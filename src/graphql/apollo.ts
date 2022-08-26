import { ApolloClient, } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import {setContext} from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client';
/* import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import {  WebSocketLink } from "@apollo/client/link/ws";
import { split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities'; */
/* "http://localhost:4000/graphql"
  "https://git.heroku.com/handbook-server.git"
 */const httpLink =  createUploadLink({
  uri: "https://handbookapi.herokuapp.com/graphql",
  credentials:'include'
})
/* const wsLink = new WebSocketLink({
  uri: 'ws://git.heroku.com/handbook-server.git',
  options:{
    reconnect:true
  }
}); */




const authLink=setContext((_:any,{headers})=>{
  const token =localStorage.getItem("token")??""
  
  return{
    headers:{
      ...headers,
      Authorization:token?'Bearer '+token:''
    }
  }
}).concat(httpLink as any)
const cache = new InMemoryCache()
/* const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink as any,
); */

export const apolloClient = new ApolloClient({
  link:authLink as any,
  cache,
})

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
