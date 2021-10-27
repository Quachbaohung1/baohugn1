const app = require('./backend/app')
const connectDatabase = require('./backend/config/database')

const dotenv = require('dotenv');

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Uncaught exceptions');
    server.close(() => {
        process.exit(1)
    })
})

// Setting up config file
dotenv.config({ path: 'backend/config/config.env'})

// Connecting to DB
connectDatabase(); 

const PORT = process.env.PORT || 5000;

//const server = app.listen(PORT, () => {
//    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
//})



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Handle Unhandle Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandle Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})