import {PrismaClient, Prisma, User} from '@prisma/client'
import {assert, object, string, size, refine, nonempty} from 'superstruct'
import isEmail from 'isemail'

const prisma = new PrismaClient()

// Runtime validation
export const validateSignUp = object({
    // string and a valid email address
    email: refine(string(), 'email', (v) => isEmail.validate(v)),
    // password is between 7 and 30 characters long
    password: size(string(), 7, 30),
    nickName: size(string(), 3, 20),
    // first name is between 2 and 50 characters long
    // firstName: size(string(), 2, 50),
    // // last name is between 2 and 50 characters long
    // lastName: size(string(), 2, 50),
})

export const validateLogin= object({
    // string and a valid email address
    email: refine(string(), 'email', (v) => isEmail.validate(v)),
    // password is between 7 and 30 characters long
    password: size(string(), 7, 30),
})

export const validateCreateSub = object({
    title: size(string(), 2, 30),
    description: nonempty(string())
})
type validateSignUp = Omit<Prisma.UserCreateArgs['data'], 'id'>

// Signup function
// async function signup(input: Signup): Promise<User> {
//     // Assert that input conforms to Signup, throwing with a helpful
//     // error message if input is invalid.
//     assert(input, Signup)
//     return prisma.user.create({
//         data: input.user,
//     })
// }

//can use joi / validator.js / Yup / Zod / superstruct