const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.post("/addProduct", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.sendStatus(201);
});

router.get("/getProducts", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.send(product);
  } catch {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

router.get("/edit-product/:id", async (req, res) => {
  await Product.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.put("/update-product/:id", async (req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student updated successfully !");
      }
    }
  );
});

router.patch("/product/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (req.body.title) {
      product.title = req.body.title;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.body.description) {
      product.description = req.body.description;
    }

    if (req.body.imageUrl) {
      product.imageUrl = req.body.imageUrl;
    }

    await product.save();
    res.send(product);
  } catch {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

router.delete("/product/:id", async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

module.exports = router;
