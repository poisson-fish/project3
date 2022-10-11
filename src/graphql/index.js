const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { resolvers } = require('./resolvers')
const path = require('path')

const buildGql = () => {
    return {
        // Construct a schema from file
        typeDefs: loadFilesSync(path.join(__dirname, 'schema/*.gql')),
        // The root provides a resolver function for each API endpoint
        resolvers: resolvers
    }
}

module.exports = { buildGql };