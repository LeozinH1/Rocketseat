"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
var CreateUser_1 = __importDefault(require("./services/CreateUser"));
function index(request, response) {
    var user = CreateUser_1.default({
        email: 'leonardosj98@hotmail.com',
        name: 'Leonardo S. Jaremczuk',
        password: 'senha123',
        techs: [{
                title: 'Node.js',
                experience: 5
            },
            {
                title: 'React',
                experience: 5
            },
            {
                title: 'React Native',
                experience: 5
            },
            "Typescript",
            "Javascript"
        ]
    });
    return response.json(user);
}
exports.index = index;
