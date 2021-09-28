const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

// CREATING AND SENDING COOKIES FUNCTION
// const createSendToken = (user, statusCode, res, message) => {
//     const id = user._id;
//     const token = jwt.sign({id}, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN
//     })

//     const cookieOptions =  {
//         expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
//         // access only on the browser
//         httpOnly: true
//         }
//                         // on https
//     if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
//         // saving jwt to cookies
//     res.cookie('jwt', token, cookieOptions);
//         // deleting password from output
//     user.password = undefined;
//         res.status(statusCode).json({
//             status: 'success',
//             message,
//             data: {
//                 user
//             }
//         })

// };



exports.signUp = async (req, res, next) => {
    try {
    const checkIfUserExist = await User.findOne({userAddress: req.body.userAddress})
    if (checkIfUserExist) return next(new AppError('This userAddress is already used', 401))
    const newUser = await User.create(req.body);
    const message = 'Succesfuly Signed up and Loged in';
    // createSendToken(newUser, 201, res, message);
    res.status(201).json({
        status: 'success',
        message,
        data: {
            user: newUser
        }
    })


    } catch(error) {
        next(error)
    }
};

exports.signIn = async (req, res, next) => {
    try {
        // const { email, password } = req.body;
        const { userAddress } = req.body;
        // checking if user provide email and password
        // if (!email || !password) return next(new AppError('Please provide all data! ', 401))
        if ( !userAddress ) return next(new AppError('Address not exist! ', 401))
        // check if user exist
        // const user = await User.findOne({email}).select('+password');
        const user = await User.findOne({userAddress: userAddress.toLowerCase()});
        // check if user exist and if password is correct

        // if (!user || !(await user.correctPassword(password, user.password))){
        //     return next(new AppError(' Incorrect email or password ', 401))
        // }

        if (!user) return next(new AppError(' Failed with finding user with provided address'))

       // createSendToken(user, 200, res, 'Succesfuly signed in')

       res.status(201).json({
            status: 'success',
            message: 'Succesfuly signed in ',
            data: {
                user
            }
        })

    } catch(error) {
        console.log(error);
        next(error)
    }
}

exports.isUserLogedIn = async (req, res, next) => {
    try {   
        // getting token
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        // checking if there is a token
        if (!token) return next(new AppError('Token doesnt exist', 401, 'JsonWebTokenError'));
        // verify token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        // finding user in database
        const currentUser = await User.findById(decoded.id);
        // if user doesnt exist, return 
        if (!currentUser) return next(new AppError('User doesnt exist', 401, 'JsonWebTokenError'));

        return res.status(200).json({
            status: 'success',
            message: 'Succesfuly Signed in',
            data: {
                user: currentUser
            }
        });

    } catch(error) {
        next(error);
    }
}

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        status: 'success'
    });
}

