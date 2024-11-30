const axios = require('axios');

async function adminCheck(req, res, next) {
    try {
        console.log(`we are here at the admin check and we see that the id recived from header is ${req.headers['id']}`);
        
        const userId = req.headers['id'];
        const response = await axios.get(`http://localhost:3001/api/v1/isAdmin/${userId}`);

        if (response.data.success && response.data.data) {
            // User is an admin
            console.log(`sucessfully feteched admin status for user`);
            
            next();
        } else {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to access this resource/data'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

module.exports = adminCheck;
