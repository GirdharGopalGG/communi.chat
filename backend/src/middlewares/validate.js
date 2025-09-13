import { ZodError } from "zod"

export const validateRequest = (schema)=>{
    return (req,res,next) =>{
        try{
            const result = schema.safeParse(req.body)
           if (!result.success) {
                // Parse the stringified JSON message
                const errorArray = JSON.parse(result.error.message)
                
                // Extract errors by field for frontend use
                const fieldErrors = {}
                const allMessages = []
                
                errorArray.forEach(err => {
                    const fieldName = err.path[0] // Get field name from path
                    const message = err.message
                    
                    // Group errors by field
                    if (!fieldErrors[fieldName]) {
                        fieldErrors[fieldName] = []
                    }
                    fieldErrors[fieldName].push(message)
                    allMessages.push(message)
                })
                
                return res.status(400).json({
                    message: allMessages[0], // First error for general display
                    errors: fieldErrors,     // Errors grouped by field for forms
                })
            }
            next()
        }
        catch(error){
            if(error.name === 'ZodError'){
                return res.status(400).json({
                    message:error.message
                })
            }
            console.error("Error in validateRequest fn in middleware\n",error)
            return res.status(500).json({
                message:"Internal server error"
            })
        }
    }
}