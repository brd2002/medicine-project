import express from "express";
import {createUser , getAllUser , getUserUsingPhoneNumber , generateOtpOnPhoneNumber} from '../controllers/user-conroller'
const router = express.Router();
router.post('/createUser' , createUser);
router.get('/users',getAllUser);
router.get('/getByPhonenumber' , getUserUsingPhoneNumber);
router.post('/generateOtp' , generateOtpOnPhoneNumber);

export  {router};