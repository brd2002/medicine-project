"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_conroller_1 = require("../controllers/user-conroller");
const router = express_1.default.Router();
exports.router = router;
router.post('/createUser', user_conroller_1.createUser);
router.get('/users', user_conroller_1.getAllUser);
router.get('/getByPhonenumber', user_conroller_1.getUserUsingPhoneNumber);
router.post('/generateOtp', user_conroller_1.generateOtpOnPhoneNumber);
//# sourceMappingURL=user-routes.js.map