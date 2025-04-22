import { PrismaClient } from '../../generated/prisma/client'
import {StatusCodes} from 'http-status-codes';
import z, {date} from 'zod';
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
            res.status(StatusCodes.NOT_ACCEPTABLE).json({
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
                res.status(StatusCodes.CREATED).json({
                    data : newUser
                })
            }else {
                res.status(StatusCodes.NOT_IMPLEMENTED).json({
                    message : "Something is wrong please try again letter."
                })
            }
        }
    }
}