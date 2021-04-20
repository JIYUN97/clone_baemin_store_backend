const { Schema, model,Types } = require("mongoose");

const GoodsSchema = new Schema({
  title: { type: String },
  price: { type: String },
  sale_price: { type: String },
  discount_rate: { type: String },
  detail_info: { type: Schema.Types.Mixed },
  thumbnail_url: { type: String },
  category: { type: Types.ObjectId, required: true, ref: "Category"},
  detail_image_url: { type: [String] },
  discount: { type: Boolean },
  option: { type: [String] },
  sold_out: { type: Boolean },
  comment_count: { type: Number, default: 0 },
});

const Goods = model("goods", GoodsSchema);
module.exports = Goods;
