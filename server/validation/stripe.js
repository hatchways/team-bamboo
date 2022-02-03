const { check, validationResult } = require("express-validator");

exports.validateSetPaymentMethod = [
  check("tokenId", "Please enter a valid token id").isString(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
