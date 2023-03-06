'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BillSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'Users'},
    products: ({type: Schema.Types.ObjectId, ref: 'Products'}),
    date: {type: Date, default: Date.now},
    total: Number,
});

module.exports = mongoose.model('Bills', BillSchema)


