const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const commonSchema = require("../../utils/commonSchema");

const ProductSchema = new Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, enm: ["USD", "NPR"], default: "NPR" },
  brand: { type: String, required: true },
  quentity: { type: Number, required: true },
  description: { type: String, required: true, maxLength: 250 },
  images: [{ type: String }],
  category: { type: ObjectId, ref: "Category" },

  ...commonSchema,
});

module.exports = model("Product", ProductSchema);
