const mongoose = require('mongoose');
const Schema = mongoose.Schema ; 

const orderSchema = new Schema({
    products : [
        {
            product : {type: String, required: true},
            quantity: {type:Number , required : true}
        },
    ],
    user : {
        name : {type:String, required : true},
        userId : {
            type : Schema.Types.ObjectId,
            ref: "Users",
            required : true
        }
    }
});

module.exports = mongoose.model('Order', orderSchema);