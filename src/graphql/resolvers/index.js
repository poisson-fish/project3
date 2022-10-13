const { User } = require('../../models/User')
const { Sessions } = require('../../models/Session')

const { idToCategory, getImage, verifyToken } = require('./utils')
const axios = require('axios')
const { ApiKey } = require('../../server/apikey')

const resolvers = {
    Mutation: {
        register: async (parent, args, context, info) => {
            const dbUserData = await User.create({
                username: args.request.username,
                email: args.request.email,
                passHash: args.request.password
            })
            if (dbUserData) {
                return {
                    token: dbUserData.createSession(),
                    status: 'OK',
                    message: 'Account creation successful.'
                }
            }
            else {
                console.log("Registration failed");
                return {
                    status: 'FAILED',
                    message: 'Account creation was unsuccessful.'
                }
            }
        },
        login: async (parent, args, context, info) => {
            console.log("hit /login")
            const dbUserData = await User.findOne({
                where: {
                    email: args.email
                }
            })
            if (!dbUserData) {
                return {
                    status: 'FAILED',
                    message: 'Credentials invalid!'
                }

            }

            if (dbUserData.comparePassword(args.password)) {
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
                token: args.token
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
        },
        search: async (parent, args, context, info) => {
            if (await verifyToken(args.token)) {
                var gameInfo = null
                try {
                    gameInfo = await axios.post('https://api.igdb.com/v4/games',
                        `fields *; where id = ${args.id};`,
                        {
                            headers: await ApiKey.getAuthorization()
                        })
                } catch (e) {
                    console.log(e)
                }
                gameInfo = gameInfo.data[0]
                if (gameInfo) {
                    return buildGameData(gameInfo)
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
        popular: async (parent, args, context, info) => {
            if (await verifyToken(args.token)) {
                var gameInfo = null
                try {
                    const apiHeaders = await ApiKey.getAuthorization()
                    gameInfo = await axios.post('https://api.igdb.com/v4/games',
                        `fields *; sort aggregated_rating_count desc; where genres = (4,5,8,9,11,12,14); limit 6;`,
                        {
                            headers: apiHeaders
                        })
                } catch (e) {
                    console.log(e)
                }

                if (gameInfo) {
                    return await Promise.all(gameInfo.data.map(async (gameInfo) => await buildGameData(gameInfo)))
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
        }
    }
};

async function buildGameData(gameInfo){
    return await {
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
}
module.exports = { resolvers };