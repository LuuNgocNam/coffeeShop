const mongoose = require('../../common/database')();

const KhoSchema = new mongoose.Schema({
    thumbnail :{
        type: String,
        default : null,
    },
    cat_id :{
        type: mongoose.Types.ObjectId,
        ref : "Category",
        required : true,
    },
    num1 :{
        type: String,
        default : 0,
    },
    num2 :{
        type: String,
        default : 0,
    },
    is_stock :{
        type: Boolean,
        default : false,
    },
    name :{
        type: String,
        default : null,
        text : true,
    },
}, {
    timestamps: true,
});

const KhoModel = mongoose.model('Kho', KhoSchema, 'kho');

module.exports = KhoModel;