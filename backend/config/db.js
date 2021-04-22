import mongoose from 'mongoose';

// Connects my MongoDB database to my backend API

const connectDB = async () => { // async function. 
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { // MONGO_URI located in the .env file
            useUnifiedTopology: true, // required 
            useNewUrlParser: true, // required 
            useCreateIndex: true, // required 
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.error(`Error: ${err.message}`.red.underline.bold)
        process.exit(1)
    }

}

export default connectDB; // export database to be imported in server.js

/* 

[ useCreateIndex ]

By default, Mongoose 5.x calls the MongoDB driver's 
ensureIndex() function. The MongoDB driver deprecated 
this function in favor of createIndex(). cart

[ useUnifiedTopology ]

removes support for several connection options 
that are no longer relevant with the new topology engine.

[ useNewUrlParser ]

The MongoDB Node.js driver rewrote the tool it uses to parse MongoDB connection strings. 
Because this is such a big change, they put the new connection string parser behind a flag.

[ for more documentation on this check out https://mongoosejs.com/docs/deprecations.html ]

*/ 