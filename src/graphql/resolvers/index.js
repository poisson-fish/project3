const { login, logout, register } = require('./mutations')
const { game, verify, search } = require('./queries')

const resolvers = {
    Mutation: {
        register: register,
        login: login,
        logout: logout
    },
    Query: {
        game: game,
        verify: verify,
        search: search
    }
};

module.exports = { resolvers };