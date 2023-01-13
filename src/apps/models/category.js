const mongoose = require('./../../common/database')();

const CategorySchema = mongoose.Schema({
    description :{
        type : String,
        default : null,
    },
    title :{
        type : String,
        required : true,
    },
    is_stock :{
        type: Boolean,
        default : false,
    },
    thumbnail :{
        type: String,
        default : null,
    },


},{
    timestamps : true 
})

const CategoryModel = mongoose.model("Category", CategorySchema, 'categories');

module.exports = CategoryModel;