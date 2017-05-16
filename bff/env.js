const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  'BACKEND_API_ENDPOINT': NODE_ENV === 'production'
    ? process.env.BACKEND_API_ENDPOINT
    : 'http://localhost:4000/graphql',
  'BACKEND_WS_ENDPOINT': NODE_ENV === 'production'
    ? process.env.BACKEND_WS_ENDPOINT
    : 'ws://localhost:4000/subscriptions'
};
