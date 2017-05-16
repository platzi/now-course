import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

let apolloClient = null;
let wsClient = null;

function _initClient(headers, initialState, wsClient = null) {
  let networkInterface;

  if (!wsClient) {
    networkInterface = createNetworkInterface({
      uri: BACKEND_API_ENDPOINT,
      opts: {
        credentials: 'same-origin',
        cors: 'no-cors',
      },
    });
  } else {
    networkInterface = addGraphQLSubscriptions(
      createNetworkInterface({
        uri: BACKEND_API_ENDPOINT,
        opts: {
          credentials: 'same-origin',
          cors: 'no-cors',
        },
      }),
      wsClient,
    );
  }

  return new ApolloClient({
    initialState,
    ssrMode: !process.browser,
    dataIdFromObject: result => result.id || null,
    networkInterface,
  });
}

export const initClient = (headers, initialState = {}) => {
  if (!process.browser) {
    return _initClient(headers, initialState, wsClient);
  }

  if (!wsClient) {
    wsClient = new SubscriptionClient(BACKEND_WS_ENDPOINT, {
      reconnect: true,
    });
  }

  if (!apolloClient) {
    apolloClient = _initClient(headers, initialState, wsClient);
  }

  return apolloClient;
};
