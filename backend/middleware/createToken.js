const jwt = require('jsonwebtoken')

const createToken = (_id, time) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: `${time}` })
}

module.exports = createToken