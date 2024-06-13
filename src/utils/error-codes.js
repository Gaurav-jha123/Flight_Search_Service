const ClientErrorCodes = Object.freeze({
    BAD_REQUEST: 400,
    UNAUTHORISED: 401,
    NOT_FOUND: 404
});

// utils/error-codes.js
module.exports = {
    SuccessCodes: {
        OK: 200,
        CREATED: 201
    },
    ServerErrorCodes: {
        INTERNAL_SERVER_ERROR: 500
    },
    ClientErrorCodes
};