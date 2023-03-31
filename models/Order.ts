const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    total_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        default: "Прийнято"
    }
})

module.exports = model('Order', orderSchema);