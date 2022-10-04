const { buildSchema } = require('graphql')

const { User } = require('../../models/User')
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  input LoginRequest {
    email: String!
    password: String!
  }
  type TokenResponse {
    status: String
    token: String!
    message: String
  }
  input LogoutRequest {
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
    register(request: RegisterRequest): GenericResponse
    login(request: LoginRequest): TokenResponse
    logout(request: LogoutRequest): GenericResponse
  }
  type Query {
    dummy: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    register: (args) => {
        User.create({
            username: args.request.username,
            email: args.request.email,
            passHash: args.request.password
        })
            .then(dbUserData => {
                return {
                    data: {
                        status: 'OK'
                    }
                }
            })
            .catch(err => {
                console.log(err);
                return {
                    data: {
                        status: 'FAILED'
                    }
                }
            });
    },
    login: async (args) => {
        console.log("hit /login")
        await User.findOne({
            where: {
                email: args.request.email
            }
        }).then(async dbUserData => {
            if (!dbUserData) {
                return {
                    data: {
                        status: 'FAILED',
                        message: 'Credentials invalid!'
                    }
                }
            }

            if (dbUserData.comparePassword(args.request.password)) {
                return {
                    "data": {
                        "login": {
                            status: 'OK',
                            token: await dbUserData.createSession()
                        }
                    }
                }


            } else {
                return {
                    data: {
                        status: 'FAILED',
                        message: 'Credentials invalid!'
                    }
                }
            }
        });
    },
    logout: (args) => {
        Sessions.deleteOne({
            token: args.request.token
        }).then(dbUserData => {
            return {
                data: {
                    status: 'OK',
                    message: "Session logged out."
                }
            }
        })
            .catch(err => {
                console.log(err);
                return {
                    data: {
                        status: 'FAILED',
                        message: "Session not found!"
                    }
                }
            });
    }
};


module.exports = { schema, root };