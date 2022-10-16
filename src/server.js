const express = require('express');
const mongoose = require("mongoose")
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} = require("apollo-server-core");

const { buildGql } = require('./graphql')

async function startApolloServer() {
  const app = express();
  app.use(express.static('dist'))
  const { typeDefs, resolvers  } = buildGql()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
     // ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await mongoose.connect('mongodb://projectUser:project3isdone@localhost:27017/testdb')
  await server.start();
  server.applyMiddleware({ app });
  const serverPort = process.env.PORT || 3001
  app.listen(serverPort, () => {
    console.log(`🚀 Server ready at http://localhost:${serverPort}
🚀 API ready at http://localhost:${serverPort}${server.graphqlPath}`);
  })
}
startApolloServer()
