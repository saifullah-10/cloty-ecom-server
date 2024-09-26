"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const register_1 = require("../../models/auth/register");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First Name Is Required"),
    lastName: zod_1.z.string().min(1, "Last Name Is Required"),
    phone: zod_1.z.string().min(1, "Phone Number Is Require").transform(val => Number(val)),
    email: zod_1.z.string().email("Invalid Email Format"),
    password: zod_1.z.string().min(6, "Password Must Be 6 characters")
});
const loginValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid Format Of Email"),
    password: zod_1.z.string().min(6, "Password Must Be 6 Characters")
});
//login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({
                message: "All Fields Are Require"
            }).end();
        }
        const checkValidation = loginValidationSchema.parse({ email, password });
        const user = await (0, register_1.getUserByEmailWithPassword)(email);
        if (user && checkValidation) {
            const isMatch = await bcrypt_1.default.compare(password, user?.hashPassword);
            if (isMatch) {
                const userWithoutPass = await (0, register_1.getUserByEmail)(email);
                return res.status(200).json(userWithoutPass);
            }
            else {
                return res.status(403).json({
                    message: "Email Or Password Mismatched"
                });
            }
        }
        else {
            return res.status(400).json({ message: "User Not Found" });
        }
    }
    catch (err) {
        return res.status(400).json(err);
    }
};
exports.loginUser = loginUser;
//register 
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, phone, email, password } = req.body;
        if (!firstName || !lastName || !phone || !email || !password) {
            return res.status(403).json({
                message: "All Field Are Require"
            }).end();
        }
        const valid = registerValidationSchema.parse({ firstName, lastName, phone, email, password });
        if (!valid) {
            return res.status(400).json({
                message: "Provide valid Information"
            }).end();
        }
        const existingUser = await (0, register_1.getUserByEmail)(email);
        if (existingUser) {
            return res.status(401).json({ message: "User Already Exist" }).end();
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashPassword = await bcrypt_1.default.hash(password, salt);
        const value = { firstName, lastName, phone, email, hashPassword, salt };
        const registerUserToDB = await (0, register_1.createUser)(value);
        return res.status(200).json(registerUserToDB).end();
    }
    catch (err) {
        return res.status(400).json(err).end();
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=auth.js.map