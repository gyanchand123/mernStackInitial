const fs = require("fs");
const model = require("../model/product");
const Product = model.Product;

//create:-
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    console.log("Product saved successfully");
    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error (11000 is the code for duplicate key error)
      // Handle the error, e.g., send a response with a message indicating the title is not unique
      console.error("Title must be unique.");
      res.json(error);
    } else {
      // Handle other errors
      console.error("An error occurred:", error);
      res.status(400).json(error);
    }
  }
};

//read:-
exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.getProduct = async (req, res) => {
  const id = req.params.id; // here the id = should not be converted to +ve.
  console.log("first id", id);
  const product = await Product.findById(id);
  res.json(product);
};

//put request:-
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

//patch request:
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

//delete product:-
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
