import mongoose from 'mongoose';

const PurchaseScheme = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const PurchaseModel = mongoose.model('Purchase', PurchaseScheme);
export default PurchaseModel;
