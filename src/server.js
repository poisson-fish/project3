const express = require('express');
const mongoose = require("mongoose")
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} = require("apollo-server-core");

<<<<<<< HEAD

app.use(routes);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'))


main().catch(err => console.log(err))

async function main () {
  // hardcoded mongodb route here
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb')
    app.listen(PORT, () => {
      console.log(`App running at http://localhost:${PORT}/`)
    })
    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
  }
=======
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
>>>>>>> f7c9e51b04d0f58804ce92ef06b2a29ba7a68a4e
