import mongoose from 'mongoose'

const connection = {}


async function dbConnect() {
    if(connection.isConnected){
        return
    }

    const db = await mongoose.connect(process.env.MONGO_URI,
        {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology:true} );
    
    // console.log(db)
}

export default dbConnect;


