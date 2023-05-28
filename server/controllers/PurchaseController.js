import PurchaseModel from '../models/Purchase.js';

export const getAll = async (req, res) => {
  try {
    const purhcases = await PurchaseModel.find({ buyer: req.user._id }).populate('product');

    res.json(purhcases);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const receivePaymentResult = async (req, res) => {
  const event = req.body;
  const metadata = event.data.object.metadata;

  try {
    const purchase = await PurchaseModel.findOneAndUpdate(
      { product: metadata.product, buyer: metadata.buyer },
      { $inc: { quantity: metadata.quantity } },
      { new: true, upsert: true }
    );

    return res.json(purchase);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
