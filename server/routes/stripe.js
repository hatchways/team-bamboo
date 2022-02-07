const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateSetPaymentMethod } = require("../validation/stripe");
const {
  setPaymentMethod,
  getPaymentMethod,
  deletePaymentMethod,
} = require("../controllers/stripe");

router
  .route("/paymentMethod")
  .post(protect, validateSetPaymentMethod, setPaymentMethod);
router.route("/paymentMethod").get(protect, getPaymentMethod);
router.route("/paymentMethod").delete(protect, deletePaymentMethod);

module.exports = router;
