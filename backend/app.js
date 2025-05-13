require('dotenv').config()
require('./cron/cleanExpiredGuest.js');

const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 4000
const cors = require('cors');
const helmet = require('helmet')
const compression = require('compression');
const AppError = require('./utils/AppError.js')
const reviewRoutes = require('./routes/review.js')
const campRoutes = require('./routes/campground.js')
const userRoutes = require('./routes/user.js');
const corsOptions = {
    origin: "http://localhost:3000",
};

// Connect to MongoDB
mongoose.connect(process.env.DB_URL);
//mongoose.connect('mongodb://localhost:27017/yelpCamp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// MIDDLEWARE
app.use(helmet())
app.use(compression());
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// **********************************
// HOME - homepage
// **********************************
app.get('/', (req, res) => {
    res.send('This is HOMEPAGE')
})

// **********************************
// ACCESS ROUTES, CAMPGROUNDS AND REVIEWS
// **********************************
app.use('/api/campgrounds', campRoutes)
app.use('/api/campgrounds/:id/reviews', reviewRoutes)
app.use('/api', userRoutes)


//******************************************************************************************************************* */


// *******************************************
// ERROR HANDLING
// *******************************************
app.all('*', (req, res, next) => {
    next(new AppError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    console.log(`NOMBRE ERROR ==> ${err.name}`);
    console.log(`MENSAJE ERROR ==> ${err.message}`);
    console.log(`STATUS ERROR ==> ${err.status}`);
    console.log(`STACK ERROR ==> ${err.stack}`);
    const { status = 500, message = 'something went wrong' } = err
    res.status(status).send({ error: message })
})

app.listen(port, () => {
    console.log(`Backend working on port ${port}`)
})