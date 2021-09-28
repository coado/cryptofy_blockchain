const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    userAddress: {
        type: String,
        required: [true, 'Provide Address']
    },
    // email: {
    //     type: String,
    //     required: [true, 'Please provide your email']
    // },
    // password: {
    //     type: String,
    //     required: [true, 'Please provide a password'],
    //     minlength: 8,
    //     select: false,
    //     validate: {
    //         validator: function(v) {
    //             var regex = /^(?=.*[A-Z])(?=.*[!@#$&*%^_-])(?=.*[0-9])(?=.*[a-z]).{8,}$/g;
    //             return regex.test(v)
    //         },
    //         message: 'Your password is too weak'
    //     }
    // },
    // confirmPassword: {
    //     type: String,
    //     required: [true, 'Please confirm your password'],
    //     validate: {
    //         validator: function(el) {
    //             return el === this.password;
    //         },
    //         message: 'Password are not the same'
    //     }
    // },
    theme: {
        type: String,
        default: 'dark'
    },
    trades: [
        {
            typeOfTrade: {
                type: String,
                enum: ['Trade', 'Deposit', 'Withdrawal', 'Mining', 'Other', 'cashProfits']
            },
            buy: {
                currency: String,
                amount: Number
            },
            sell: {
                currency: String,
                amount: Number
            },
            comment: String,
            date: String,
            course: Number,
            tradeProfit: Number
        }
    ],
    transactions: [
        {
            buyAmount: {
                type: Number,
                required: [true, 'Provide amount of buying currency.']
            },
            buyCourse: {
                type: Number,
                required: [true, 'Provide course of buying currency.']
            },
            buyCurrency: {
                type: String,
                required: [true, 'Provide bought currency.']
            },
            buyDate: {
                type: String,
                required: [true, 'Provide date when transaction was fullfiled']
            },
            profit: Number,
            sellAmount: Number,
            sellCourse: Number,
            sellDate: String,
            percentageCourseChange: Number
        }
    ],
    futures: [
        {
            typeOfFuture: {
                type: String,
                required: [true, 'Provide type of Future']
            },
            contract: String,
            profit: Number,
            entry: Number,
            laverage: String,
            date: String
        }
    ]
});


// userSchema.pre('save', async function(next) {
//     if(!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 12);
//     this.confirmPassword = undefined;
//     next();
// });

// userSchema.methods.correctPassword = async function(providedPassword, password) {
//     return await bcrypt.compare(providedPassword, password);
// };

const User = mongoose.model('User', userSchema);

module.exports = User;