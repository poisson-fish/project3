const { gql } = require('apollo-server-express');

const { User } = require('../models/User')
const { Sessions } = require('../models/Session');
const axios = require('axios');

const { ApiKey } = require('../server/apikey')
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
  input SearchRequest {
    token: String!
    query: String!
  }
  input IDRequest {
    token: String!
    id: Int!
  }
  type CategoryResponse {
    id: Int!
    category_str: String!
  }
  type ImageResponse {
    image_id: Int
    game_id: Int
    width: Int
    height: Int
    url: String
  }
  type GameResponse {
    id: Int
    name: String
    category: CategoryResponse
    covers: ImageResponse
    screenshots: [ImageResponse]
    similar_game_ids: [Int]
    status: String
    message: String
  }
  type Mutation {
    register(request: RegisterRequest!): GenericResponse!
    login(request: LoginRequest!): TokenResponse!
    logout(request: TokenRequest!): GenericResponse!
  }
  type Query {
    verify(request: TokenRequest!): GenericResponse
    search(request: SearchRequest!): [GameResponse]
    game(request: IDRequest!): GameResponse
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
                    status: 'FAILED'
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
                    status: 'OK',
                    message: "Session logged out."
                }
            } else {
                console.log(err);
                return {
                    status: 'FAILED',
                    message: "Session not found!"
                }
            }
        }
    },
    Query: {
        game: async (parent, args, context, info) => {
            if (await verifyToken(args.request.token)) {
                var gameInfo = null
                try {
                    gameInfo = await axios.post('https://api.igdb.com/v4/games',
                        `fields *; where id = ${args.request.id};`,
                        {
                            headers: await ApiKey.getAuthorization()
                        })
                } catch (e) {
                    console.log(e)
                }
                gameInfo = gameInfo.data[0]
                if (gameInfo) {

                    const gameData = {
                        id: gameInfo.id,
                        name: gameInfo.name,
                        category: {
                            id: gameInfo.category,
                            category_str: idToCategory(gameInfo.category)
                        },
                        cover_url: await getImage('covers', gameInfo.cover),
                        screenshots: await gameInfo.screenshots.map(async i => await getImage('screenshots', i)),
                        similar_game_ids: gameInfo.similar_games,
                        status: 'OK',
                        message: 'Operation successful'
                    }

                    return gameData
                } else {
                    return {
                        status: 'FAILED',
                        message: 'Unauthorized'
                    }
                }
            }
            else {
                return {
                    status: 'FAILED',
                    message: 'Unauthorized'
                }
            }
        },
        verify: async (parent, args, context, info) => {
            return verifyToken(args.request.token) ?
                {
                    status: 'OK',
                    expiry: dbSessionData.createdAt + dbSessionData.createdAt.expires,
                    message: "Session was verified."
                } :
                {
                    status: 'FAILED',
                    message: "Session not found or failed to verify!"
                }
        }
    }
};

// Utility functions
const verifyToken = async (token) => {
    const dbSessionData = await Sessions.findOne({
        token: token
    }).populate('user')
    if (dbSessionData) {
        return await dbSessionData.user.verifySession(dbSessionData.token)
    }
    return false;
}

const CategoryIds = new Map([
    [0, 'main_game'],
    [1, 'dlc_addon'],
    [2, 'expansion'],
    [3, 'bundle'],
    [4, 'standalone_expansion'],
    [5, 'mod'],
    [6, 'episode'],
    [7, 'season'],
    [8, 'remake'],
    [9, 'remaster'],
    [10, 'expanded_game'],
    [11, 'port'],
    [12, 'fork'],
]);

const idToCategory = (catId) => {
    return CategoryIds.get(catId)
}

const getImage = async (type, id, size='t_1080p') => {
    var imageInfo = null
    try {
        imageInfo = await axios.post(`https://api.igdb.com/v4/${type}`,
            `fields *; where id = ${id};`,
            {
                headers: await ApiKey.getAuthorization()
            })
    } catch (e) {
        console.log(e)
    }
    imageInfo = imageInfo.data[0]
    if (imageInfo) {
        return {
            image_id: imageInfo.id,
            game_id: imageInfo.game,
            width: imageInfo.width,
            height: imageInfo.height,
            url: `https:${imageInfo.url.replace('thumb',size)}`
        }
    }
    else {
        return {}
    }
}
module.exports = { typeDefs, resolvers };