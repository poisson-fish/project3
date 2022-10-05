const { gql } = require('apollo-server-express');

const { User } = require('../models/User')
const { Sessions } = require('../models/Session')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  input LoginRequest {
    email: String!
    password: String!
  }
  type TokenResponse {
    status: String!
    token: String
    message: String
  }
  input TokenRequest {
    token: String!
  }

  input RegisterRequest {
    username: String!
    password: String!
    email: String!
  }
  type GenericResponse {
    status: String!
    message: String
  }

  type Mutation {
    register(request: RegisterRequest!): GenericResponse!
    login(request: LoginRequest!): TokenResponse!
    logout(request: TokenRequest!): GenericResponse!
  }
  type Query {
    verify(request: TokenRequest!): GenericResponse!
  }
`

// The root provides a resolver function for each API endpoint
const resolvers = {
    Mutation: {
        register: (parent, args, context, info) => {
            const dbUserData = User.create({
                username: args.request.username,
                email: args.request.email,
                passHash: args.request.password
            })
            if (dbUserData) {
                return {
                    status: 'OK'
                }
            }
            else {
                console.log("Registration failed");
                return {
                    data: {
                        status: 'FAILED'
                    }
                }
            }
        },
        login: async (parent, args, context, info) => {
            console.log("hit /login")
            const dbUserData = await User.findOne({
                where: {
                    email: args.request.email
                }
            })
            if (!dbUserData) {
                return {
                    status: 'FAILED',
                    message: 'Credentials invalid!'
                }

            }

            if (dbUserData.comparePassword(args.request.password)) {
                return {
                    status: 'OK',
                    token: dbUserData.createSession(),
                    message: 'Login successful'
                }


            } else {
                return {
                    status: 'FAILED',
                    message: 'Credentials invalid!'
                }
            }

        },
        logout: (parent, args, context, info) => {
            const dbSessionData = Sessions.deleteOne({
                token: args.request.token
            })
            if (dbSessionData) {
                return {
                    data: {
                        status: 'OK',
                        message: "Session logged out."
                    }
                }
            } else {
                console.log(err);
                return {
                    data: {
                        status: 'FAILED',
                        message: "Session not found!"
                    }
                }
            }
        }
    },
    Query: {
        verify: async (parent, args, context, info) => {
            const dbSessionData = await Sessions.findOne({
                token: args.request.token
            }).populate('user')
            if (dbSessionData) {
                if (await dbSessionData.user.verifySession(dbSessionData.token)) {
                    return {
                        status: 'OK',
                        message: "Session was verified."
                    }

                }
                else {
                    return {
                        status: 'FAILED',
                        message: "Session not found or failed to verify!"
                    }
                }
            }
        }
    }
};


module.exports = { typeDefs, resolvers };