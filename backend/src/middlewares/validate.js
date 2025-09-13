import { ZodError } from "zod"

export const validateRequest = (schema)=>{
    return (req,res,next) =>{
        try{
            schema.safeParse(req.body)
            next()
        }
        catch(error){
            if(error instanceof ZodError){
                return res.status(400).json({
                    message:error.errors[0].message
                })
            }
            console.log("Error in validateRequest fn in middleware",error)
            return res.status(500).json({
                message:"Internal server error"
            })
        }
    }
}