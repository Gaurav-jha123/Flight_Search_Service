const { StatusCodes } = require('http-status-codes');

const ClientErrorCodes = Object.freeze({
    BAD_REQUEST: StatusCodes.BAD_REQUEST, // 400
    UNAUTHORIZED: StatusCodes.UNAUTHORIZED, // 401
    NOT_FOUND: StatusCodes.NOT_FOUND // 404
});

module.exports = {
    SuccessCodes: {
        OK: StatusCodes.OK, // 200
        CREATED: StatusCodes.CREATED // 201
    },
    ServerErrorCodes: {
        INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR // 500
    },
    ClientErrorCodes
};
