const { Schema, model, Types } = require("mongoose");

const CommentSchema = Schema(
  {
    user: { type: Types.ObjectId, required: true, ref: "User" },
    goods: { type: Types.ObjectId, required: true, ref: "Goods" },
    comment: { type: String, required: true },
    star_rating: { type: number, required: true },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", CommentSchema);
module.exports = Comment;
