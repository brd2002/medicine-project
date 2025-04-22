import express from "express";
import {createUser} from '../controllers/user-conroller'
const router = express.Router();
router.post('/createUser' , createUser);
export  {router};