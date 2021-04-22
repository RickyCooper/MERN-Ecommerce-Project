import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// A Mongoose schema defines the structure of the document, default values, validators. 

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },},
    {
        timestamps:true
    }
);

// Below creates a function that will check if the inputted password maches the crypted password.
// This function will be avalible anywhere the User model is imported by user.matchPassword

userSchema.methods.matchPassword = async function (enteredPassword) { 
    return await bcrypt.compare(enteredPassword, this.password) 
}

/* This middleware is defined on the schema level and can modify the query or the document itself 
as it executed.  invoked with two arguments: the event trigger (as a string) and the callback function 
that is triggered for that particular event. The callback itself takes in an argument of a function, 
which we typically call next , and when invoked — advances the document/query to the next awaiting 
middleware. 
*/ 

userSchema.pre('save', async function(next) {

    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10) 
    this.password = await bcrypt.hash(this.password, salt) // hashes the password 
})

const User = mongoose.model('User', userSchema);

// A Mongoose model provides an interface to the database for creating, querying, updating, deleting records

export default User;