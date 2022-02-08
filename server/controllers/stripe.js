const stripe = require("stripe")(process.env.STRIPE_SECRET);
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Request = require("../models/Request");
const { Types } = require("mongoose");
const differenceInHours = require("date-fns/differenceInHours");

// @route GET /requests/:requestId/pay
// @desc complete payment for this request
// @access Private
exports.payForRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.params;
  if (!Types.ObjectId.isValid(requestId)) {
    res.status(400);
    throw new Error("Bad request");
  }

  const request = await Request.findById(requestId).populate("owner");
  if (!request) {
    res.status(404);
    throw new Error("Not found");
  }

  const loggedInUserId = req.user.id.toString();
  const ownerId = request.owner._id.toString();

  if (loggedInUserId !== ownerId) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  if (request.status === "paid") {
    res.status(400);
    throw new Error("Already paid");
  }

  const { hourlyRate } = await Profile.findOne(
    {
      userId: request.sitter.toString(),
    },
    "-_id hourlyRate"
  );

  const totalHours = differenceInHours(request.end, request.start);
  const totalDollars = totalHours * hourlyRate;
  const totalCents = totalDollars * 100;

  try {
    const charge = await stripe.charges.create({
      customer: request.owner.stripeId,
      currency: "usd",
      amount: totalCents,
    });

    request.status = "paid";
    request.save();
    res.status(200).send({ success: { charge } });
  } catch (e) {
    res.status(400);
    throw e;
  }
});

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
