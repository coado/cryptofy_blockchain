const express = require('express');
const path = require('path')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authController = require('./controllers/authController');
const tradeController = require('./controllers/tradeController');
const transactionController = require('./controllers/transactionController');
const futuresController = require('./controllers/futuresController');
const themeController = require('./controllers/themeController');

const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(cookieParser());
app.use(cors());


app.post('/signup', authController.signUp);
app.post('/signin', authController.signIn); 
app.get('/auth', authController.isUserLogedIn);
app.get('/logout', authController.logout);

// TRADES
app.put('/newTradeRecord', tradeController.newTradeRecord);
app.put('/deleteTrade', tradeController.deleteTradeRecord);
app.put('/updateTrade', tradeController.updateTradeRecord);

// TRANSACTIONS
app.put('/uploadTransaction', transactionController.newTransaction);
app.put('/deleteTransaction', transactionController.deleteTransaction);
app.put('/updateTransaction', transactionController.updateTransaction);

// FUTURES
app.put('/uploadFuture', futuresController.newFuture);
app.put('/deleteFuture', futuresController.deleteFuture);
app.put('/updateFuture', futuresController.updateFuture)

//THEME
app.put('/setTheme', themeController.setUserTheme);



app.use(globalErrorHandler);
module.exports = app;