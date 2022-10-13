const axios = require('axios')
const { ApiKey } = require('../../server/apikey')
const { Sessions } = require('../../models/Session')

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

const idToCompany = async (compId) => {
    var involvedCompany = null
    try {
        involvedCompany = await axios.post(`https://api.igdb.com/v4/involved_companies`,
            `fields company; where id = ${compId};`,
            {
                headers: await ApiKey.getAuthorization()
            })
    } catch (e) {
        console.log(e)
    }
    if (involvedCompany) {
        var companyInfo = null
        try {
            companyInfo = await axios.post(`https://api.igdb.com/v4/companies`,
                `fields name; where id = ${involvedCompany.data[0].company};`,
                {
                    headers: await ApiKey.getAuthorization()
                })
        } catch (e) {
            console.log(e)
        }

        if (companyInfo?.data && companyInfo?.data.length > 0) {
            return companyInfo.data[0].name
        }
        else {
            return null
        }
    }
    else {
        return null
    }
}

const getImage = async (type, id, size = 't_1080p') => {
    var imageInfo = null
    try {
        imageInfo = await axios.post(`https://api.igdb.com/v4/${type}`,
            `fields url; where id = ${id};`,
            {
                headers: await ApiKey.getAuthorization()
            })
    } catch (e) {
        console.log(e)
    }

    if (imageInfo?.data) {
        imageInfo = imageInfo.data[0]
        return {
            url: `https:${imageInfo.url.replace('t_thumb', size)}`
        }
    }
    else {
        return {}
    }
}

module.exports = { getImage, idToCategory, idToCompany, verifyToken }