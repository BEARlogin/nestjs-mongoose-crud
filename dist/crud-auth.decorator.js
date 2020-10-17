"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const util = require('util');
exports.CrudAuth = (options) => (target) => {
    Reflect.defineMetadata(constants_1.CRUD_AUTH_METADATA, options, target);
};
