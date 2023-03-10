import { ApolloClient, InMemoryCache } from "@merged/solid-apollo";

export const client = new ApolloClient({
  uri: `${location.protocol}//${window.location.hostname}${import.meta.env.VITE_BACKEND_URL}`,
  cache: new InMemoryCache(),
  headers: {
    verycoolheadernothingtoseehere: localStorage.getItem("lessonlog-key") || "",
  },
});
