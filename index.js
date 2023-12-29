const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
// const fetch = require('node-fetch');
const planRoutes = require('./PlanRoutes');
app.use(planRoutes);
app.use(cors());

const port = 3001;
const arr = [];
async function Fetchhere() {
  const a = 'hum first';
  try {
    const stripe = require('stripe')(process.env.STRIPE_KEY);

    stripe.products.list(
      {
        limit: 3,
      },
      function (err, prod) {
        if (arr.length < 1) {
          arr.push(prod);
        }
      }
      //   (err, prod) => {
      //     arr.push(prod);
      //   }
    );
  } catch (error) {
    throw error;
  }
  return arr;
}

app.get('/plan', async (req, res) => {
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', '*');

  // // Request methods you wish to allow
  // res.setHeader(
  //   'Access-Control-Allow-Methods',
  //   'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  // );

  // // Request headers you wish to allow
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'X-Requested-With,content-type'
  // );

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  Fetchhere()
    .then((x) => res.send(x))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log('server running ' + port);
});
