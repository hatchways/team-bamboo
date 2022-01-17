const mongoose = require("mongoose");
const User = require("./models/User");
const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  check("name", "Please enter a name").not().isEmpty(),
  check("email", "Please enter a valid email address").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateLogin = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

const notifyTypes = ["user", "message"];

exports.validateNotification = [
  check("notifyType")
    .isString()
    .isIn(notifyTypes)
    .withMessage(
      `notifyType must be one of the following: ${notifyTypes.join(" | ")}`
    ),
  check("title", "Please provide a title for the notification")
    .isString()
    .not()
    .isEmpty(),
  check("description", "Please provide a description for the notification")
    .isString()
    .not()
    .isEmpty(),
  check("receivers")
    .isArray({ min: 1 })
    .withMessage("Array must contain at least one recipient.")
    .custom(
      async (receivers) =>
        new Promise(async (resolve, reject) =>
          (await receivers.reduce(
            async (acc, receiver) =>
              // await previous reduce call value
              (await acc) &&
              receiver instanceof Object &&
              Reflect.has(receiver, "id") &&
              mongoose.Types.ObjectId.isValid(receiver.id) &&
              (await User.findById(receiver.id)),
            true
          ))
            ? resolve(true)
            : reject(false)
        )
    )
    .withMessage(
      "Receivers must be and array of objects that contain valid user 'id's"
    ),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];
