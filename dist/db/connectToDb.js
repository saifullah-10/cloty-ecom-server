"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kpsyb7k.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`;
    try {
        await mongoose_1.default.connect(uri, { dbName: "cloty" });
        console.log("connect to mongoDB");
    }
    catch (err) {
        console.log(`Error connecting to Database`);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=connectToDb.js.map