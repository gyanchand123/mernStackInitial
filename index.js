require("dotenv").config();
console.log("env pwd", process.env.DB_PASSWORD);
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server = express(); // server starts here
const path = require("path");
server.use(cors());
server.use(express.json());
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
server.use("/products", productRouter.routes);
server.use("/users", userRouter.routes);

/* if we use this then from this point onwards, we can access the end-points with a new baseurl like : 
"http://localhost:8080/api/products"
*/

//db connection code:
const mongoose = require("mongoose");
// if there is any, catch() block will detect it.
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected!");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//schema:-

// body parser:
server.use(morgan("default"));
server.use(express.static(process.env.PUBLIC_DIR));
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log("server starts");
});
