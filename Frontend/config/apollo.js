
import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from "@apollo/client";


/*import fetch from "node-fetch";*/

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:5000',
    /*fetch*/
  })
});

export default client;
