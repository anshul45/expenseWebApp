"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conn = () => mongoose_1.default.connect(process.env.MONGO)
    .then(() => console.log("Mongo Connected Sucessfully"))
    .catch((error) => console.log("Error connecting mongo_server" + error.message));
exports.conn = conn;
