const { Schema, model, Types } = require("mongoose");

const CategorySchema = Schema(
  {
    name: { type: String, required: true },
  },
  
);

const Category = model("Category", CategorySchema);
module.exports = Category;