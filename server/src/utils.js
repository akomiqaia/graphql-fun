const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-supersecret'

function getUserId(context) {
    const Authoization = context.request.get('Authorization')
    if (Authoization) {
        const token = Authoization.replace("Bearer ", "")
        const {userId} = jwt.verify(token, APP_SECRET)
        return userId
    }

    throw new Error('Not Authonticated')
}

module.exports = {
    APP_SECRET,
    getUserId,
}