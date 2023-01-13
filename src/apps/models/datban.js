const mongoose = require('./../../common/database')();

const DatbanSchema = mongoose.Schema({
    first_name: {
        type: String,
        default: null,
    },
    last_name: {
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
    time: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        default: null,
    },
    note: {
        type: Number,
        default: null,
    },
}, {
    timestamps: true
})

const DatbanModel = mongoose.model("Datban", DatbanSchema, 'datban');

module.exports = DatbanModel;