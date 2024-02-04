const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');

const formSchema = new mongoose.Schema({
    name: {
        type: String
        },
        phone: {
            type: Number
        },
        email:{
            type:String,
            unique: true,
            validate:[validator.isEmail,'Please provide a valid email']
        },
        DOB:{
            type:Date,
        },
        password:{
            type: String
        },
    }
)

formSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

const Form = new mongoose.model('Form',formSchema);

module.exports = Form;