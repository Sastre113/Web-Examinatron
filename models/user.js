const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Aprende a escribir');
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minLength:7,

        validate(valor){
            if(valor.toLowerCase().includes('password'))
                throw new Error('Easy pass');
        }
    },
    age:{
        type: Number,
        default: 0,
        min: 0
    }
})

userSchema.pre('save', async function(next){
    const user = this; // Hace referencia al esquema
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
});


const User = mongoose.model('User',userSchema);
module.exports = User;