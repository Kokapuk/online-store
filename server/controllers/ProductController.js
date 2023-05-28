import ProductModel from '../models/Product.js';
import stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripeClient = stripe(process.env.STRIPE_PRIVATE_KEY);

export const getAll = async (_req, res) => {
  try {
    const products = await ProductModel.find({});

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

export const buy = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product does not exist' });
    }

    const session = await stripeClient.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: [product.imageUrl],
            },
            unit_amount: product.price,
          },
          quantity: req.body.quantity ?? 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment_result_success`,
      cancel_url: `${process.env.CLIENT_URL}/payment_result_failure`,
      payment_intent_data: {
        metadata: {
          product: product.id,
          buyer: req.user._id,
          quantity: req.body.quantity ?? 1,
        },
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
