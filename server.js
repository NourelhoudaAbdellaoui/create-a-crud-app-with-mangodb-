const express = require("express"); // include in the node_modules
const mongoose = require("mongoose");
const product = require("./models/productModeule");
const Product = require("./models/productModeule");
const app = express();

app.use(express.json());
//routes
app.get("/", (req, res) => {
  res.send("hello node api");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post("/product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update the product

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // we cannnot find any product
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id} ` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: ` we cannot find any product with id ${id}` });
    }
    res.status(200).json(product);
  } catch {
    res.status(500).json({ message: error.message });
  }
});
mongoose
  .connect(
    "mongodb+srv://admin:admin1234@cluster0.x8d1lyy.mongodb.net/crudAPI?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to the mangodb");
    app.listen(3000, () => {
      console.log("node Api app is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
