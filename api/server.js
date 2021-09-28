const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNCAUGTH EXCEPTION! Shutting down..');
        // 0 -success, 1 - uncaught exception
        process.exit(1);
});

dotenv.config({path: './config.env'});

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection succesful'));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});

// process.on('unhandledRejection', err => {
//     console.log(err);
//     console.log('UNHANDLER REJECTION! Shutting down..');
//     server.close(() => {
//         // 0 -success, 1 - uncaught exception
//         process.exit(1);
//     });
// });
