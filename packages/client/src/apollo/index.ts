import { ApolloClient } from '@apollo/client/core';
import { InMemoryCache } from "@apollo/client/core";

if (!process.env.VUE_APP_STRAPI_GRAPHQL_URL) {
  throw new Error("The Strapi server's URL was not set in an .env file!");
}

export const apolloProvider = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.VUE_APP_STRAPI_GRAPHQL_URL
});
