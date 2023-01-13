const mongoose = require('./../../common/database')();

const ContactSchema = mongoose.Schema({
    name :{
        type : String,
        default : null,
    },
    email :{
        type : String,
        default : null,
    },
    evaluate :{
        type : String,
        default : null,
    },
    day :{
        type : String,
        default : null,
    },
    note :{
        type : String,
        default : null,
    },

},{
    timestamps : true 
})

const ContactModel = mongoose.model("Contact", ContactSchema, 'contact');

module.exports = ContactModel;