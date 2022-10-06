import { ApolloClient, InMemoryCache } from "@merged/solid-apollo";

export const client = new ApolloClient({
  uri: "http://localhost:3030",
  cache: new InMemoryCache(),
});
