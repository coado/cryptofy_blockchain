const User = require('../models/userModel');

exports.newFuture = async (req, res, next) => {
    try {
        const {id, typeOfFuture, contract, profit, date, entry, laverage} = req.body;

        const user = await User.findByIdAndUpdate(id, {
            $push: {
                futures: {      
                   $each: [ {typeOfFuture, contract, profit, entry, laverage, date} ]
                },
    
            },
           
        
            },
            { 
                new: true,
                runValidators: true
                
            }

        )
            
        res.status(200).json({  
            status: 'success',
            message: 'Succesfuly added new future',
            user
        })

    } catch(error) {
        console.log(error);
        next(error);
    }
}

exports.deleteFuture = async (req, res, next) => {
    try {
        console.log(req.body);
        const { id, records } = req.body; 
        const user = await User.findByIdAndUpdate(id, { $pull: {
            futures:
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

exports.updateFuture = async (req, res, next) => {
    try{


        const {id, objectID, typeOfFuture, contract, date, profit, entry, laverage} = req.body;
        const user = await User.findOneAndUpdate(
            {
                "_id": id
            },
            {
            "$set": {
                "futures.$[elem].typeOfFuture": typeOfFuture,
                "futures.$[elem].contract": contract,
                "futures.$[elem].date": date,
                "futures.$[elem].profit": profit,
                "futures.$[elem].entry": entry,
                "futures.$[elem].laverage": laverage
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
    }
    
catch(error) {
    console.log(error);
    next(error)
}
    
}