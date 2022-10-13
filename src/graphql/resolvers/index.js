const { User } = require('../../models/User')
const { Sessions } = require('../../models/Session')

const { idToCategory, idToCompany, getImage, verifyToken } = require('./utils')
const { ApiKey } = require('../../server/apikey')
const axios = require('axios')
const axiosRetry = require('axios-retry')


axiosRetry(axios, {
    retries: 10, // number of retries
    retryDelay: (retryCount) => {
        console.log(`retry attempt: ${retryCount}`);
        return retryCount * 2000; // time interval between retries
    },
    retryCondition: (error) => {
        // if retry condition is not specified, by default idempotent requests are retried
        return error.response.status !== 200;
    },
});

const resolvers = {
    Mutation: {
        register: async (parent, args, context, info) => {
            const dbUserData = await User.create({
                username: args.username,
                email: args.email,
                passHash: args.password
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
        },
        addToFavorites: async (parent, args, context, info) => {
            if (await verifyToken(args.token)) {
                const dbSessionData = await Sessions.findOne({
                    token: token
                }).populate('user')
                if (dbSessionData) {
                    return await dbSessionData.user.addFav(args.id)
                    return {
                        status: 'OK',
                        message: 'Favorite added.'
                    }
                }
                else {
                    return {
                        status: 'FAILED',
                        message: 'Could not find user.'
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
    },
    Query: {
        game: async (parent, args, context, info) => {
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
            return verifyToken(args.token) ?
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
            var gameInfo = null
            try {
                const apiHeaders = await ApiKey.getAuthorization()
                gameInfo = await axios.post('https://api.igdb.com/v4/games',
                    `fields *; sort aggregated_rating_count desc; where genres = (4,5,8,9,11,12,14); limit 4;`,
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
        },
        favorites: async (parent, args, context, info) => {
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
    }
}

async function buildGameData(gameInfo) {

    return await {
        id: gameInfo.id,
        name: gameInfo.name,
        category: {
            id: gameInfo.category,
            category_str: idToCategory(gameInfo.category)
        },
        cover_url: await getImage('covers', gameInfo.cover),
        screenshots: await gameInfo.screenshots?.slice(0, 1).map(async i => await getImage('screenshots', i)),
        similar_game_ids: gameInfo.similar_games,
        summary: gameInfo.summary,
        company: gameInfo.involved_companies ? await idToCompany(gameInfo.involved_companies?.at(0)) : null,
        status: 'OK',
        message: 'Operation successful'
    }
}
module.exports = { resolvers };