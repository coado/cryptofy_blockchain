const User = require('../models/userModel');
const AppError = require('../utils/appError');

exports.newTradeRecord = async (req, res, next) => {
    try {
        const {id, typeOfTrade, buy, sell, comment, date, course, tradeProfit} = req.body;
        const user = await User.findByIdAndUpdate(id, { 
        $push: {
            trades: {      
               $each: [ {typeOfTrade, buy, sell, comment, date, course, tradeProfit} ]
            },

        },
       
    
        },
        { 
            new: true,
            runValidators: true
            
        }
        )

        // Just for reference, putting wallet into user object:

        // const user1 = await User.findOneAndUpdate({_id: id, "wallet.currency": buy.currency}, {
        //     $push: {
        //         trades: {
                   
        //            $each: [ {typeOfTrade, buy, sell, comment, date}],
        //            $position: 0
        //         },
    
        //     },
        //     $inc:{
        //         "wallet.$[elem].amount": buy.amount
        //     }
        // }, {
        //     arrayFilters: [{"elem.currency": buy.currency}],
        //     new: true,
        //     runValidators: true
        // });

        // const user2 = await User.findOneAndUpdate({_id: id, "wallet.currency": { $nin: [buy.currency]}}, {
        //     $push:{
        //         trades: {
               
        //             $each: [ {typeOfTrade, buy, sell, comment, date}],
        //             $position: 0
        //          },

        //         wallet: {
        //             "currency": buy.currency,
        //             "amount": buy.amount
        //         }
        //     }
        // }, {
        //     new: true,
        //     runValidators: true
        // });


        // if(user1 !== null) {
        //     res.status(200).json({  
        //         status: 'success',
        //         message: 'Succesfuly added new record',
        //         user: user1
        //     })
        // }
        // if (user2 !== null) {
        //     res.status(200).json({  
        //         status: 'success',
        //         message: 'Succesfuly added new record',
        //         user: user2
        //     })
        // }
        

        res.status(200).json({  
            status: 'success',
            message: 'Succesfuly added new record',
            user
        })
       
    } catch(error) {
        console.log(error);
        return next(error);
    }
}

exports.deleteTradeRecord = async (req, res, next) => {
    try {
        const { id, records } = req.body; 
        const user = await User.findByIdAndUpdate(id, { $pull: {
            trades:
                {
                _id: {$in: records}
            }
        }}, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            message: 'Succesfuly deleted record',
            user
        })

    } catch(error) {
        console.log(error);
        next(error);
    }
}

exports.updateTradeRecord = async (req, res, next) => {
    try {   
        const {id, objectID, typeOfTrade, buy, sell, comment, date, tradeProfit, course} = req.body;

        const user = await User.findOneAndUpdate(
            {
                "_id": id
            },
            {
            "$set": {
                "trades.$[elem].typeOfTrade": typeOfTrade,
                "trades.$[elem].buy": buy,
                "trades.$[elem].sell": sell,
                "trades.$[elem].comment": comment,
                "trades.$[elem].date": date,
                "trades.$[elem].tradeProfit": tradeProfit,
                "trades.$[elem].course": course
            }},
            {
                arrayFilters: [{"elem._id" : objectID}],
                 new: true,
                runValidators: true
            });

        res.status(200).json({
            status: 'success',
            message: 'Succesfuly updated record',
            user
        });
        
    } catch(error) {
        console.log(error);
        next(error);
    }
};