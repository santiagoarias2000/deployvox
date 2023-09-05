"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.syntaxErrHandler = void 0;
const syntaxErrHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).send({ status: 400, message: err.message });
    }
    next();
};
exports.syntaxErrHandler = syntaxErrHandler;
const notFoundHandler = (req, res, next) => {
    return res.status(404).send({ status: 404, message: 'Not found' });
};
exports.notFoundHandler = notFoundHandler;
