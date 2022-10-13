import { ApolloClient, InMemoryCache } from "@merged/solid-apollo";

export const client = new ApolloClient({
  uri: `http://${window.location.hostname}:3030`,
  cache: new InMemoryCache(),
});
