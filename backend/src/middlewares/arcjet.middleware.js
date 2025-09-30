import aj from '../lib/arcjet.js'
import { isSpoofedBot } from "@arcjet/inspect";


export const arcjetMiddleware = async (req, res, next) => {
    try{
    const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
    
  if (decision.isDenied()) {
    
    if (decision.reason.isRateLimit()) {
        res.status(429).json({message:'Too many requests'})

    } else if (decision.reason.isBot()) {
        res.status(403).json({message:'No bots allowed'})
    }
    
  } else if (decision.results.some(isSpoofedBot)) {
    res.status(403).json({message:'forbidden'})
  } 
  next()
}catch(error){ 
    console.error('Error in arcjet middleware',error)
    res.status(500).json({message:'Internal server error'})
}
};
