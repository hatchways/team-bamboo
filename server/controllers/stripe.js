const stripe = require("stripe")(process.env.STRIPE_SECRET);
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @route POST /stripe/paymentMethod
// @desc Set logged in user's payment method
// @access Private
exports.setPaymentMethod = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { email } = user;
  if (!user.stripeId) {
    const { id } = await stripe.customers.create({ email });
    user.stripeId = id;
    await user.save();
  }

  const { stripeId } = user;
  const { tokenId } = req.body;
  const { default_source } = await stripe.customers.update(stripeId, {
    source: tokenId,
  });
  const card = await stripe.customers.retrieveSource(stripeId, default_source);

  res.status(201).json({
    success: { card },
  });
});

// @route GET /stripe/paymentMethod
// @desc Get logged in user's payment method
// @access Private
exports.getPaymentMethod = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { stripeId } = user;
  if (!stripeId) {
    res.status(200).json({
      success: { card: null },
    });
    return;
  }

  const { default_source } = await stripe.customers.retrieve(stripeId);
  const card = await stripe.customers.retrieveSource(stripeId, default_source);

  res.status(200).json({
    success: { card },
  });
});

// @route DELETE /stripe/paymentMethod
// @desc Delete logged in user's payment method
// @access Private
exports.deletePaymentMethod = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { stripeId } = user;
  if (stripeId) {
    const { default_source } = await stripe.customers.retrieve(stripeId);
    await stripe.customers.deleteSource(stripeId, default_source);
    user.stripeId = "";
    await user.save();
  }
  res.status(204).send();
});
