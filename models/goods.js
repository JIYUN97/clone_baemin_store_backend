const mongoose = require("mongoose");

const { Schema } = mongoose;
const goodsSchema = new Schema({
  title: {
      type : String
  },
  price: {
    type: String,
  },
  sale_price: {
    type: String
  },
  discount_rate: {
    type: String
  },
  detail_info: {
    type: Schema.Types.Mixed
  },
  thumbnail_url: {
    type: String
  },

  category: {
    type: String
  },
  detail_image_url: {
    type: [String]
  },

  discount: {
    type: Boolean
  },

  option: {
    type: [String]
  }
});


module.exports = mongoose.model("Goods", goodsSchema);