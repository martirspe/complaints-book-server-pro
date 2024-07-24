const redisClient = require('../config/redis');

// Data Model
const { User } = require('../models/');

exports.checkLicense = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the customer by its ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate if the user has a registered license
        if (!user.license_type || !user.license_expiration_date) {
            return res.status(404).json({ message: 'No license was found for the user.' });
        }

        const currentDate = new Date();
        let response;

        if (currentDate > user.license_expiration_date) {
            response = {
                active: false,
                message: 'Your license has expired.'
            };
        } else {
            response = {
                active: true,
                licenseType: user.license_type,
                message: 'Your license is active.'
            };
        }

        // Cache the response
        redisClient.setEx(userId, 3600, JSON.stringify(response)); // Cache por 1 hora

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
