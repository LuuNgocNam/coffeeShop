const mongoose = require('./../../common/database')();

const CthoadonSchema = mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    price: {
        type: String,
        default: null,
    },
    qty: {
        type: String,
        default: null,
    },
    total: {
        type: Number,
        default: null,
    },
    id_hd: {
        type: mongoose.Types.ObjectId,
        ref: "hoadon",
    },

}, {
    timestamps: true
})

const CthoadonModel = mongoose.model("Ctoadon", CthoadonSchema, 'cthoadon');

module.exports = CthoadonModel;