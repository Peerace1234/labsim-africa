const express = require("express");
const router = express.Router();
require("dotenv").config();

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = STRIPE_KEY ? require("stripe")(STRIPE_KEY) : null;

router.post("/create-session", async (req, res) => {
  const { moduleId, priceCents = 0 } = req.body || {};

  if (!stripe) {
    return res.status(501).json({ error: "Stripe not configured on server" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Course access: ${moduleId}` },
            unit_amount: priceCents,
          },
          quantity: 1,
        },
      ],
      success_url:
        process.env.STRIPE_SUCCESS_URL ||
        "http://localhost:3000/?checkout=success",
      cancel_url:
        process.env.STRIPE_CANCEL_URL ||
        "http://localhost:3000/?checkout=cancel",
    });

    res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create checkout session" });
  }
});

module.exports = router;
