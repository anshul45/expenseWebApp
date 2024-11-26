"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conn = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conn = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const mongoURI = process.env.MONGO;
    if (!mongoURI) {
        console.error("MongoDB connection string is not defined in the environment variables.");
        process.exit(1);
    }
    mongoose_1.default.connect((_a = process.env.MONGO) !== null && _a !== void 0 ? _a : "")
        .then(() => console.log("Mongo Connected Sucessfully"))
        .catch((error) => console.log("Error connecting mongo_server" + error.message));
});
exports.conn = conn;
