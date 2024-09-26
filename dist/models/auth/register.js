"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.createUser = exports.getAllUsers = exports.getUserById = exports.getUserByEmailWithPassword = exports.getUserByEmail = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.User = mongoose_1.default.model("User", new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hashPassword: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false }
}));
const getUserByEmail = (email) => exports.User.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserByEmailWithPassword = (email) => exports.User.findOne({ email }).select("+hashPassword");
exports.getUserByEmailWithPassword = getUserByEmailWithPassword;
const getUserById = (id) => exports.User.findById(id);
exports.getUserById = getUserById;
const getAllUsers = () => exports.User.find();
exports.getAllUsers = getAllUsers;
const createUser = (value) => new exports.User(value).save().then(user => user.toObject());
exports.createUser = createUser;
const deleteUser = (id) => exports.User.findOneAndDelete({ _id: id });
exports.deleteUser = deleteUser;
const updateUser = (id, value) => exports.User.findByIdAndUpdate(id, value);
exports.updateUser = updateUser;
//# sourceMappingURL=register.js.map