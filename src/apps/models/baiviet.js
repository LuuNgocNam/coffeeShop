const mongoose = require('./../../common/database')();

const BaivietSchema = mongoose.Schema({
    name :{
        type : String,
        default : null,
    },
    thumbnail :{
        type : String,
        default : null,
    },
    author :{
        type : String,
        default : null,
    },
    day : {
        type : String,
        default : null,
    },
    comment : {
        type : String,
        default : null,
    },
    content : {
        type : String,
        default : null,
    },
},{
    timestamps : true
})

const BaivietModel = mongoose.model("Baiviet", BaivietSchema, 'baiviet');
module.exports = BaivietModel;