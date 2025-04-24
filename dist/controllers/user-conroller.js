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
exports.createUser = createUser;
exports.getAllUser = getAllUser;
exports.getUserUsingPhoneNumber = getUserUsingPhoneNumber;
exports.generateOtpOnPhoneNumber = generateOtpOnPhoneNumber;
const client_1 = require("../../generated/prisma/client");
const http_status_codes_1 = require("http-status-codes");
const zod_1 = __importDefault(require("zod"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const prisma = new client_1.PrismaClient();
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // first take user data
        const user = req.body;
        const userSchema = zod_1.default.object({
            firstname: zod_1.default.string(),
            lastname: zod_1.default.string(),
            phonenumber: zod_1.default.string().min(10, { message: "Need to be valid phone number" }),
            email: zod_1.default.string().email({ message: "Need to be a valid email address" }),
            password: zod_1.default.string().min(6, { message: "Atleast 6 letters needed" }),
            drugLicenseNumber: zod_1.default.string(),
            LicenseOwner: zod_1.default.string(),
            TradeLicenseNumber: zod_1.default.string(),
            ShopName: zod_1.default.string(),
            isVerified: zod_1.default.boolean().default(false)
        });
        const isValidUser = userSchema.parse(user);
        if (isValidUser) {
            // check alread user exist or not
            // using phone number
            const findingUser = yield prisma.user.findUnique({
                where: {
                    // Replace with the user's identifier
                    phonenumber: user.phonenumber,
                },
            });
            if (findingUser) {
                return res.status(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE).json({
                    message: "User already exit"
                });
            }
            else {
                const newUser = yield prisma.user.create({
                    data: {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        phonenumber: user.phonenumber,
                        email: user.email,
                        password: user.password,
                        drugLicenseNumber: user.drugLicenseNumber,
                        LicenseOwner: user.drugLicenseNumber,
                        TradeLicenseNumber: user.TradeLicenseNumber,
                        ShopName: user.ShopName
                    }
                });
                if (newUser) {
                    return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                        data: newUser
                    });
                }
                else {
                    return res.status(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED).json({
                        message: "Something is wrong please try again letter."
                    });
                }
            }
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "Please right information"
            });
        }
    });
}
function getAllUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const allUser = yield prisma.user.findMany();
        return res.status(http_status_codes_1.StatusCodes.OK).json({ data: allUser });
    });
}
function getUserUsingPhoneNumber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const phonenumber = req.body.phonenumber;
        const findUser = yield prisma.user.findUnique({
            where: {
                phonenumber: phonenumber
            }
        });
        if (findUser) {
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: "user is here",
                data: findUser
            });
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "user Not exist"
            });
        }
    });
}
function generateOtpOnPhoneNumber(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const phonenumber = req.body.phonenumber;
        // const client = await twilio(process.env["TWILIO_ACCOUNT_SID"], process.env["TWILIO_AUTH_TOKEN"]);
        // console.log(client);
        const findUser = yield prisma.user.findUnique({
            where: {
                phonenumber: phonenumber
            }
        });
        if (findUser) {
            const otp = otp_generator_1.default.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
            let phoneNumberExistOnOtpDb = yield prisma.otp.findUnique({
                where: {
                    phonenumber: phonenumber
                }
            });
            if (phoneNumberExistOnOtpDb) {
                const updateOtp = yield prisma.otp.update({
                    where: {
                        phonenumber: phonenumber,
                    },
                    data: {
                        otp: otp
                    }
                });
                if (updateOtp) {
                    return res.status(http_status_codes_1.StatusCodes.OK).json({
                        message: "Otp updated successfull",
                        otp: otp
                    });
                }
                else {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                        message: "Something is wrong please try again letter.",
                    });
                }
            }
            else {
                const createPhoneNumberWithOtp = yield prisma.otp.create({
                    data: {
                        phonenumber: phonenumber,
                        otp: otp
                    }
                });
                if (createPhoneNumberWithOtp) {
                    return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                        message: "Otp create successfully.",
                        otp: otp
                    });
                }
                else {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                        message: "Something is going wrong"
                    });
                }
            }
        }
    });
}
//# sourceMappingURL=user-conroller.js.map