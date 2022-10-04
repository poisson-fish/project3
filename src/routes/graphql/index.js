const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const {schema, root} = require('./Schema')

const graphRoutes = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});

module.exports = graphRoutes;