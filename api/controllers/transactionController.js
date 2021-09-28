const User = require('../models/userModel');


exports.newTransaction = async (req, res, next) => {
    try {
    const { id, buyAmount, buyCourse, buyCurrency, buyDate, profit, sellCourse, sellDate, percentageCourseChange } = req.body;
    const user = await User.findByIdAndUpdate(id, {
        $push: {
            transactions: {      
               $each: [ {buyAmount, buyCourse, buyCurrency, buyDate, profit, sellCourse, sellDate, percentageCourseChange} ],
               $position: 0
            },

        },
       
    
        },
        { 
            new: true,
            runValidators: true
            
        })

        res.status(200).json({  
            status: 'success',
            message: 'Succesfuly added new transaction',
            user
        });

    } catch (error) {
        console.log(error);
        next(error)
    }

    };

    exports.deleteTransaction = async (req, res, next) => {
        try {
            const { id, records } = req.body; 
            const user = await User.findByIdAndUpdate(id, { $pull: {
                transactions:
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

    exports.updateTransaction = async (req, res, next) => {
        try {   
            const {id, objectID, buyAmount, buyCurrency, buyDate, buyCourse, profit, sellCourse, sellDate, percentageCourseChange} = req.body;
            const user = await User.findOneAndUpdate(
                {
                    "_id": id
                },
                {
                "$set": {
                    "transactions.$[elem].buyAmount": buyAmount,
                    "transactions.$[elem].buyCurrency": buyCurrency,
                    "transactions.$[elem].buyDate": buyDate,
                    "transactions.$[elem].buyCourse": buyCourse,
                    "transactions.$[elem].profit": profit,
                    "transactions.$[elem].sellCourse": sellCourse,
                    "transactions.$[elem].sellDate": sellDate,
                    "transactions.$[elem].percentageCourseChange": percentageCourseChange
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
    }