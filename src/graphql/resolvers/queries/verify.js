const verifyToken = require('../utils')

const verify = async (parent, args, context, info) => {
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
module.exports = { verify }