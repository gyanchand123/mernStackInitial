const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema:-
const productSchema = new Schema({
  title: { type: String, require: true, unique: true },
  description: String,
  price: {
    type: Number,
    min: [0, "wrong price"],
    require: true,
  },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min discount"],
    max: [50, "wrong max discount"],  
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max discount"],
    default:0
  },
  brand: { type: String, require: true },
  category: { type: String, require: true },
  thumbnail: { type: String, require: true },
  images: [String],
});

//model:-
exports.Product = mongoose.model("Product", productSchema);
