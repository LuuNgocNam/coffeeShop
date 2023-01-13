const mongoose = require('./../../common/database')();

const NhanvienSchema = mongoose.Schema({
    name :{
        type : String,
        default : null,
    },
    thumbnail :{
        type : String,
        default : null,
    },
    sex :{
        type : String,
        default : null,
    },
    position : {
        type : String,
        default : null,
    },
    day : {
        type : String,
        default : null,
    },
    addr : {
        type : String,
        default : null,
    },
},{
    timestamps : true
})

const NhanvienModel = mongoose.model("Nhanvien", NhanvienSchema, 'nhanvien');
module.exports = NhanvienModel;