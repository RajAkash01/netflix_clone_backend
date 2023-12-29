const express = require('express');
const router = express.Router();
const cors = require('cors');

const stripe = require('stripe')(process.env.STRIPE_KEY);
router.use(express.json());
router.use(cors());
router.post('/create-checkout-session', async (req, res) => {
  try {
    //console.log(req.body.item.default_price);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      // line_items: req.body.items.map((item) => {
      //   const storeItem = storeItems.get(item.id);
      //   return {
      //     price_data: {
      //       currency: 'usd',
      //       product_data: {
      //         name: 'Testname',
      //       },
      //       unit_amount: '199',
      //     },
      //     quantity: item.quantity,
      //   };
      // }),
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: req.body.item.default_price,
          quantity: 1,
        },
      ],
      success_url: `http://127.0.0.1:3000/profile`,
      cancel_url: `http://127.0.0.1:3000/profile`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
