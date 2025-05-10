//SCRIPT IS CALLED IN APP.JS
const cron = require('node-cron');
const delGuest = require('../middleware/delGuest');
const User = require('../models/user');
const GUEST_EXPIRATION_PERIOD = 2 * 60 * 1000; // 30min

const cleanExpiredGuest = cron.schedule('* * * * *', async () => {
    console.log('Running a task every minute to clean up expired guest data');
    try {
        const users = await User.find({ username: /guest-/ });
        const currentTime = Date.now();

        for (const user of users) {
            const userCreationTime = new Date(user.createdAt).getTime();
            console.log('GUEST WILL BE ERASED IN ==>', (GUEST_EXPIRATION_PERIOD - (currentTime - userCreationTime)) / 1000)

            if (currentTime - userCreationTime > GUEST_EXPIRATION_PERIOD) {
                await delGuest(user._id)
                console.log(`Deleted data for expired guest user: ${user.username}`);
            }
        }
    } catch (error) {
        console.error('Error cleaning up expired guest data:', error);
    }
});

module.exports = cleanExpiredGuest