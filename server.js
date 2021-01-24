const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const shortid = require('shortid');
require('dotenv').config();

const app = express();

//apply middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//conect to mongoDB
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});
//   .then(() => console.log('DB CONNECTED'))
//   .catch((err) => console.log('DB CONNECTION ERR', err));

//data model and schema
const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);

//route
app.get('/api/products', async (req, res) => {
  //to get list of products from database
  const products = await Product.find({});
  res.send(products);
});

app.post('/api/products', async (req, res) => {
  //to get list of products from database
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete('/api/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(
    req.params.id
  );
  res.send(deletedProduct);
});

//create model for order
const Order = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);
app.post('/api/orders', async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: 'Data is required.' });
  }
  const order = await Order(req.body).save();
  res.send(order);
});
// port
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
