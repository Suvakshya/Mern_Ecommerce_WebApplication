import { Address } from "../models/Address.js";
import TryCatch from "../utils/TryCatch.js";

export const addAddress = TryCatch(async (req, res) => {
  const { address, phone } = req.body;

  if (!address || !phone) {
    return res.status(400).json({
      message: "Address and phone are required",
    });
  }

  await Address.create({
    address,
    phone,
    user: req.user._id,
  });

  res.status(201).json({
    message: "Address created",
  });
});

export const getAllAddress = TryCatch(async (req, res) => {
  const allAdress = await Address.find({ user: req.user._id });

  res.json(allAdress);
});

export const getSingleAddress = TryCatch(async (req, res) => {
  const address = await Address.findById(req.params.id);

  res.json(address);
});

export const deleteAddress = TryCatch(async (req, res) => {
  const address = await Address.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  await address.deleteOne();

  res.json({
    message: "address Deleted",
  });
});
