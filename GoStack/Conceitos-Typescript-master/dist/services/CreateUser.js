"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createUser(params) {
    var user = {
        name: params.name,
        email: params.email,
        password: params.password,
        techs: params.techs
    };
    return user;
}
exports.default = createUser;
