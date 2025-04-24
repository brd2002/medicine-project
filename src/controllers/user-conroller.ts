import { PrismaClient } from '../../generated/prisma/client'
import {StatusCodes} from 'http-status-codes';
import z, {date, util} from 'zod';
import  otpGenerator from 'otp-generator';
import twilio from 'twilio';
const prisma = new PrismaClient();
export async function createUser (req , res){
    // first take user data
    const user = req.body;
    const userSchema = z.object({
        firstname: z.string(),
        lastname: z.string(),
        phonenumber: z.string().min(10 , {message : "Need to be valid phone number"}),
        email: z.string().email({message: "Need to be a valid email address"}),
        password: z.string().min(6 , {message:"Atleast 6 letters needed"}),
        drugLicenseNumber: z.string(),
        LicenseOwner: z.string(),
        TradeLicenseNumber: z.string(),
        ShopName: z.string(),
        isVerified: z.boolean().default(false)
    })
    const isValidUser = userSchema.parse(user);
    if(isValidUser){
        // check alread user exist or not
        // using phone number
        const findingUser = await prisma.user.findUnique({
            where: {
                 // Replace with the user's identifier
                phonenumber : user.phonenumber,
            },
        });
        if(findingUser){
            return res.status(StatusCodes.NOT_ACCEPTABLE).json({
                message : "User already exit"
            })
        }else{
            const newUser = await prisma.user.create({
                data:{
                    firstname : user.firstname,
                    lastname : user.lastname,
                    phonenumber:user.phonenumber,
                    email:user.email,
                    password:user.password,
                    drugLicenseNumber:user.drugLicenseNumber,
                    LicenseOwner:user.drugLicenseNumber,
                    TradeLicenseNumber:user.TradeLicenseNumber,
                    ShopName:user.ShopName
                }
            })
            if(newUser){
                return res.status(StatusCodes.CREATED).json({
                    data : newUser
                })
            }else {
                return res.status(StatusCodes.NOT_IMPLEMENTED).json({
                    message : "Something is wrong please try again letter."
                })
            }
        }
    }else{
        return res.status(StatusCodes.BAD_REQUEST).json({
            message : "Please right information"
        })
    }
}
export async function getAllUser(req , res){
    const allUser = await prisma.user.findMany();
    return res.status(StatusCodes.OK).json({data : allUser});
}
export async function getUserUsingPhoneNumber(req , res){
    const phonenumber = req.body.phonenumber;
    const findUser = await prisma.user.findUnique({
        where : {
            phonenumber : phonenumber
        }
    })
    if (findUser){
       return  res.status(StatusCodes.OK).json({
            message : "user is here",
            data : findUser
        })
    }else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message:"user Not exist"
        });
    }
}
export async function generateOtpOnPhoneNumber(req , res){
    const phonenumber = req.body.phonenumber;
    // const client = await twilio(process.env["TWILIO_ACCOUNT_SID"], process.env["TWILIO_AUTH_TOKEN"]);
    // console.log(client);
    const findUser = await prisma.user.findUnique({
        where : {
            phonenumber : phonenumber
        }
    })
    if(findUser){
        const otp= otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false , lowerCaseAlphabets : false});
        let phoneNumberExistOnOtpDb = await prisma.otp.findUnique({
            where : {
                phonenumber : phonenumber
            }
        });
        if(phoneNumberExistOnOtpDb){
            const updateOtp = await prisma.otp.update({
                where:{
                    phonenumber : phonenumber,
                },
                data:{
                    otp : otp
                }
            });
            if(updateOtp){
                    return  res.status(StatusCodes.OK).json({
                        message : "Otp updated successfull",
                        otp : otp
                    })
            }else{
                return  res.status(StatusCodes.BAD_REQUEST).json({
                    message : "Something is wrong please try again letter.",
                });
            }
        }
        else{
            const createPhoneNumberWithOtp = await prisma.otp.create({
                data:{
                    phonenumber : phonenumber,
                    otp:otp
                }
            });
            if(createPhoneNumberWithOtp){
                    return res.status(StatusCodes.CREATED).json({
                        message :"Otp create successfully.",
                        otp : otp
                    })
            }else{
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message : "Something is going wrong"
                })
            }
        }
    }
}