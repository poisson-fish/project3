const User = require('../../../models/User')

const login = async (parent, args, context, info) => {
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

}

module.exports = { login }