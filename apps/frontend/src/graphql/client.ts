import { ApolloClient, InMemoryCache } from "@merged/solid-apollo";

export const client = new ApolloClient({
  uri: `http://${window.location.hostname}${import.meta.env.VITE_BACKEND_URL}`,
  cache: new InMemoryCache(),
});
