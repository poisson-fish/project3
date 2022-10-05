const express = require('express');
const mongoose = require("mongoose")
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} = require("apollo-server-core");

const { typeDefs, resolvers } = require('./graphql/schema')

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(express.static('dist'))
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
  await mongoose.connect('mongodb://user:password@localhost:27017/testdb')
  await server.start();
  server.applyMiddleware({ app });
  const serverPort = process.env.PORT || 3001
  app.listen(serverPort, () => {
    console.log(`🚀 Server ready at http://localhost:${serverPort}
🚀 API ready at http://localhost:${serverPort}${server.graphqlPath}`);
  })
}
startApolloServer(typeDefs, resolvers)