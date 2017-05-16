const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { SubscriptionManager } = require('graphql-subscriptions');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const { Todo } = require('./db');
const pubsub = require('./pubsub');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV || 'development';

(async () => {
  try {
    // sync models with DB
    // if development we force the sync and delete old data
    await Todo.sync({ force: NODE_ENV !== 'production' });
  } catch (error) {
    console.log(error);
    process.exit(0);
  }

  // create express app and http server
  const app = express();
  const server = createServer(app);

  // set generic middlewares
  app.use(cors());
  app.use(compression());
  app.use(morgan('common'));

  // create GraphQL schema and subscription manager
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const subscriptionManager = new SubscriptionManager({
    schema,
    pubsub,
    setupFunctions: {
      todoUpdated(optiosn, args) {
        return {
          todoUpdated: {
            filter: todo => todo.id === args.id,
          },
        };
      },
      todoCreated(options, args) {
        return {
          todoCreated: {
            filter: todo => todo.status === args.status,
          },
        };
      },
    },
  });

  // set /graphql endpoint
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

  // set GraphiQL IDE in development
  if (NODE_ENV !== 'production') {
    app.use('/ide', graphiqlExpress({
      endpointURL: '/graphql',
      subscriptionsEndpoint: `ws://${HOST}:${PORT}/subscriptions`,
    }));
  }

  server.listen(PORT, HOST, error => {
    new SubscriptionServer({ subscriptionManager }, { server, path: '/subscriptions' });
    console.log('> Server running on http://%s:%d', HOST, PORT)
  });
})();
