const User = require('../../../models/User')

const register = (parent, args, context, info) => {
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
}
module.exports = { register }