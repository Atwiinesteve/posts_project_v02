// Importing Modules.
const winston = require('winston');

// Setting up errors.
const errors = (error, request, response, next) => {
    try {
        winston.error(error.message, error);
        return response.status(500).send('Server Under Maintainance..')
    } catch (error) {
        console.log({ name: error.name, message: error.message, stack: error.stack });
        return response.status(500).json({ message: 'Server Under Maintainance..' })
    }
};

// Exporting Errors Configs.
module.exports = { errors };