const { Schema, model, Types } = require("mongoose");

const CategorySchema = Schema(
  {
    goods: { type: Types.ObjectId, required: true, ref: "Goods" },
    name: { type: String, required: true },
  },
  
);

const Category = model("Category", CategorySchema);
module.exports = Category;