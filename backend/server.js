const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

const app = express();

// Middleware for body parser
app.use(express.json())
// Middleware to accept urlencoded form
app.use(express.urlencoded({extended: false}))


// create routes
app.get('/', (req, res) => {
    res.json({message: "Welcome mother fucker!"});
})

// import errorHandler route 
app.use(errorHandler)


// Imported userRoutes api
app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, () => console.log(`Server started on ${PORT}`))