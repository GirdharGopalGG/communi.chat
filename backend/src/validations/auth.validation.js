import {z} from 'zod'

const passwordSchema = z.string()
    .trim()
    .min(1,{error:"password is required"})
    .min(8,{error:"password must be of 8 characters"})
   /*  // .refine((password)=>/[A-Z]/.test(password),{
    //     error: "Password must contain an uppercase"
    // })
    // .refine((password)=>/[a-z]/.test(password), {
    //     error: "Password must contain a lowercase"
    // })
    // .refine((password)=>/[0-9]/.test(password),{
    //     error:"Password must contain a number"
    // })
    // .refine((password)=>/[@#$_-.&]/.test(password),{
    //     error:"Password must contain a special character"
    // }) */
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$-_.])[A-Za-z\d@#$-_.]{8,}$/,{
        error:"Password must contain at least 8 characters with an uppercase, a lowercase, a number and a special character"
    })

export const signupSchema = z.object({
    fullname: z.string()
        .trim()
        .min(1, {error:"Full name is required"})
        .min(5, {error:"Full name must be at least 5 characters"}),

    email: z.email(),

    password: passwordSchema
})


// export const loginSchema = z.object()

// export const 