const axios = require('axios')
const { DateTime } = require("luxon");

const ApiKey = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    access_token: null,
    expire_time: DateTime.now(),
    isExpired: function () {
        return this.expire_time > Date.now()
    },
    getAuthorization: async function () {
        if (this.access_token === null || this.isExpired()) {
            try {
                const result = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${this.client_id}&client_secret=${this.client_secret}&grant_type=client_credentials`);
                if (result) {
                    this.access_token = result.data.access_token
                    this.expire_time = DateTime.now().plus({ seconds: result.data.expires_in })
                }
            } catch(e){
                return {}
            }
        }
        return {
            'Client-ID': this.client_id,
            'Authorization': `Bearer ${this.access_token}`
        }
    }

}

module.exports = {
    ApiKey
}
