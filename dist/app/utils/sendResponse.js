"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = ({ res, sendData }) => {
    const { statusCode, success, message, data, meta } = sendData;
    const responsePayload = Object.assign(Object.assign({ success,
        message }, (data !== undefined && { data: data || null })), (meta !== undefined && { meta: meta || null }));
    res.status(statusCode).json(responsePayload);
};
exports.sendResponse = sendResponse;
