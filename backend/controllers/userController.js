const createToken = require('../middleware/createToken')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const delGuest = require('../middleware/delGuest');


const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body.user
        const foundDuplicate = await User.findDuplicate(username, email)
        if (foundDuplicate) {
            return next(new AppError('Username or email already in use', 401))
        }
        const user = new User({ username, email, hashedPW: password })
        await user.save()
        const token = createToken(user._id, '3600s')
        const data = { username, token }
        res.status(200).send(data)
    } catch (e) {
        next(e)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body.user
        const foundUser = await User.findAndValidate(username, password) // Check user model
        if (!foundUser) {
            return next(new AppError('User credentials not found', 401))
        }
        const token = createToken(foundUser._id, '3600s')
        const data = { username, token }
        return res.status(200).send(data)
    } catch (e) {
        next(e)
    }
}

const registerGuest = async (req, res, next) => {
    try {
        const { username } = req.body.invitado
        const userGuest = new User({ username })
        await userGuest.save()
        const token = createToken(userGuest._id, '120s')
        res.status(200).send({ token, username })
    } catch (e) {
        next(e)
    }
}

const newToken = async (req, res, next) => {
    try {
        const { username } = req.body.invitado
        const user = await User.findOne({ username })
        if (!user) {
            return next(new AppError('User not found', 404));
        }
        const token = createToken(user._id, '10s')
        res.status(200).send({ token, username })
    } catch (e) {
        next(e)
    }
}

const deleteGuestInfo = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return next(new AppError('Authorization token required', 401));
        }
        const token = authorization.split(' ')[1]
        const guestID = jwt.verify(token, process.env.SECRET)._id
        await delGuest(guestID) //we delete all the information related to that guest
        res.status(200).send('all good')
    } catch (e) {
        next(e)
    }
}

const saveGuestAsUser = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) {
            return next(new AppError('Authorization token required', 401));
        }
        const tokenn = authorization.split(' ')[1]
        const guestID = jwt.verify(tokenn, process.env.SECRET)._id
        const { username, email, password } = req.body.user
        const foundDuplicate = await User.findDuplicate(username, email)
        if (foundDuplicate) {
            return next(new AppError('Username or email already in use', 401))
        }
        const updateUser = await User.findByIdAndUpdate(guestID, { $set: { username, email, hashedPW: password } }, { new: true })
        await updateUser.save()
        const token = createToken(guestID, '3600s')
        const data = { username, token }
        res.status(200).send(data)
    } catch (e) {
        next(e)
    }
}




module.exports = {
    registerUser, loginUser, registerGuest,
    newToken, deleteGuestInfo, saveGuestAsUser
}