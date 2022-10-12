const { idToCategory, getImage, verifyToken } = require('../utils')
const axios = require('axios')
const { ApiKey } = require('../../../server/apikey')

const search = async (parent, args, context, info) => {
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
}

module.exports = { search }