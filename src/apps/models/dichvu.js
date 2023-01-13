const mongoose = require('./../../common/database')();

const DichvuSchema = mongoose.Schema({
    name :{
        type : String,
        default : null,
    },
    describle :{
        type : String,
        default : null,
    },
    thumbnail :{
        type: String,
        default : null,
    },


},{
    timestamps : true 
})

const DichvuModel = mongoose.model("Dichvu", DichvuSchema, 'dichvu');

module.exports = DichvuModel;