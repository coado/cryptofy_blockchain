const User = require('../models/userModel');


exports.setUserTheme = async (req, res, next) => {
    try {
        const { id, theme } = req.body;
        
        const user = await User.findByIdAndUpdate(id, {
            theme
        });
            
        res.status(200).json({  
            status: 'success',
            message: 'Succesfuly changed theme',
        })

        
    } catch(error) {
        next(error)
    }
}