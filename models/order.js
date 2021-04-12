const { Schema, model, Types } = require("mongoose");

const OrderSchema = new Schema(
  {
    user: { type: Types.ObjectId, required: true, ref: "User" },
    goods: { type: Types.ObjectId, required: true, ref: "Goods" },
    address_one: { type: String },
    address_two: { type: String },
    delivery_comment: { type: String },
    phone_number: { type: String },
    payment_method: { type: String },
  },
  { timestamps: true }
);

const Order = model("order", OrderSchema);
module.exports = Order;