const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    hashedPW: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username })
    if (foundUser) {
        const passOk = await bcrypt.compare(password, foundUser.hashedPW)
        return passOk ? foundUser : false
    }
    return false;
}

userSchema.statics.findDuplicate = async function (username, email) {
    const foundUser = await this.findOne({ $or: [{ username }, { email }] })
    return foundUser ? foundUser : false;
}

//THIS ONE EXECUTES JUST BEFORE WE SAVE, IT IS SAVED JUST IN THE NEXT()
userSchema.pre('save', async function (next) {
    //this.username = 'I AM HACKER'
    //this.hashedPW = 'NOT YOUR REAL PASSWORD'
    if (this.hashedPW) {
        this.hashedPW = await bcrypt.hash(this.hashedPW, 12);
    }
    next()
})

module.exports = mongoose.model('User', userSchema);