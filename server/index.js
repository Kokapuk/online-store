import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import * as ProductController from './controllers/ProductController.js';
import * as PurchaseController from './controllers/PurchaseController.js';
import * as UserController from './controllers/UserController.js';
import { signInValidation, signUpValidation } from './utils/Validator.js';
import checkAuth from './utils/checkAuth.js';

dotenv.config();

try {
  await mongoose.connect(process.env.DB_URI);
  console.log('DB Connected');
} catch (err) {
  console.log(err);
  process.exit(err.code);
}

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/signup', signUpValidation, UserController.signUp);
app.post('/auth/signin', signInValidation, UserController.signIn);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/products', ProductController.getAll);
app.post('/products/:id', checkAuth, ProductController.buy);

app.get('/purchases', checkAuth, PurchaseController.getAll);
app.post('/purchases/webhook', PurchaseController.receivePaymentResult);

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Listening at port ${process.env.PORT}...`);
});
