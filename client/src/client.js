import { ApolloClient, InMemoryCache, createHttpLink, setContext} from "@apollo/client";


const httpLink = createHttpLink({
  uri: "http://127.0.0.1:4000/graphql",
});
// URI for PC is local host 4000/graphql
//URI for mac is currentn uri 
//URI for heorku will be just "/graphql"

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const client = new ApolloClient({
 link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
