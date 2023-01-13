const mongoose = require('./../../common/database')();

const HoadonSchema = mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
    },
    day: {
        type: String,
        default: null,
    },
    method: {
        type: String,
        default: null,
    },
    price: {
        type: Number,
        default: null,
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "Product",
    }],
    is_stock: {
        type: Boolean,
        default: null,
    },

}, {
    timestamps: true
})

const HoadonModel = mongoose.model("Hoadon", HoadonSchema, 'hoadon');

module.exports = HoadonModel;