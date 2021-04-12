const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  id: { type: String },
  password: { type: String },
  name: { type: String },
  email: { type: String },
  phone_number: { type: String },
  address_one: { type: String },
  address_two: { type: String },
});

UserSchema.virtual("userId").get(() => {
  return this._id.toHexString;
});

UserSchema.set("toJSON", {
  virtuals: true,
});

const User = model("user", UserSchema);
module.exports = User;
