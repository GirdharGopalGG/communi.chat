import mongoose from 'mongoose' 

let isConnected = false;

export const connectDB = async()=>{
    if (isConnected) return;
    try {
        const db = await mongoose.connect(process.env.MongoDB_URI)
        isConnected = db.connections[0].readyState;
        console.log('MongoDB connected', db.connection.host)
    } catch (error) {
        console.error('error connecting mongoDB', error)
    }
    
}