import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";
import TryCatch from "../utils/TryCatch.js";

export const addToCart = TryCatch(async (req, res) => {
  const { product } = req.body;

  const cart = await Cart.findOne({
    product: product,
    user: req.user._id,
  }).populate("product");

  if (cart) {
    if (cart.product.stock === cart.quauntity)
      return res.status(400).json({
        message: "Out of Stock",
      });

    cart.quauntity = cart.quauntity + 1;

    await cart.save();

    return res.json({
      message: "Added to cart",
    });
  }

  const cartProd = await Product.findById(product);

  if (cartProd.stock === 0)
    return res.status(400).json({
      message: "Out of Stock",
    });

  await Cart.create({
    quauntity: 1,
    product: product,
    user: req.user._id,
  });

  res.json({
    message: "Added to cart",
  });
});

export const removeFromCart = TryCatch(async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  await cart.deleteOne();

  res.json({
    message: "Removed from cart",
  });
});

export const updateCart = TryCatch(async (req, res) => {
  const { action } = req.query;

  if (action === "inc") {
    const { id } = req.body;
    const cart = await Cart.findById(id).populate("product");

    if (cart.quauntity < cart.product.stock) {
      cart.quauntity++;
      await cart.save();
    } else {
      return res.status(400).json({
        message: "Out of stock",
      });
    }

    res.json({
      message: "cart updated",
    });
  }

  if (action === "dec") {
    const { id } = req.body;
    const cart = await Cart.findById(id).populate("product");

    if (cart.quauntity > 1) {
      cart.quauntity--;
      await cart.save();
    } else {
      return res.status(400).json({
        message: "You have only one item",
      });
    }

    res.json({
      message: "cart updated",
    });
  }
});

export const fetchCart = TryCatch(async (req, res) => {
  const cart = await Cart.find({ user: req.user._id }).populate("product");

  const sumofQuantities = cart.reduce(
    (total, item) => total + item.quauntity,
    0
  );

  let subTotal = 0;

  cart.forEach((i) => {
    const itemSubTotal = i.product.price * i.quauntity;
    subTotal += itemSubTotal;
  });

  res.json({ cart, subTotal, sumofQuantities });
});
