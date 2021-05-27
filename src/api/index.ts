import { ApolloClient, InMemoryCache } from '@apollo/client';
const url = process.env.BACKEND_URL || 'https://intuit-connect.herokuapp.com/';
const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
});
export * from './queries';
export * from './mutations';
export default client;
