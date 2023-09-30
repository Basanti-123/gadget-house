const { Schema, model } = require("mongoose");
const commonSchema = require("../../utils/commonSchema");

const OrderSchema = new Schema({
  shippingInfo: { 
    
 city:{type: String, required: true },
 state:{type: String, required: true },
 country:{type: String, required: true },
 address:{type: String, required: true },
  }, 
  ...commonSchema,
});

module.exports = model("Order", OrderSchema);
