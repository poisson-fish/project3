const Sessions = require('../../../models/Session')

const logout = (parent, args, context, info) => {
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

module.exports = { logout }