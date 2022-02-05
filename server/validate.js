const mongoose = require("mongoose");
const User = require("./models/User");
const Notification = require("./models/Notification");
const { check, param, query, validationResult } = require("express-validator");
const Conversation = require("./models/Conversation");
const Profile = require("./models/Profile");

const isValidMongoId = (id) => mongoose.Types.ObjectId.isValid(id);
const idExists = (Schema) => async (id) =>
  (await Schema.findById(id).exec()) ? Promise.resolve() : Promise.reject();

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

exports.validateMarkNotification = [
  param("id", "Notification is not valid")
    .custom(isValidMongoId)
    .withMessage("Provided id is not a valid")
    .custom(idExists(Notification))
    .withMessage("No notification found with provided id."),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];

const messageSortFields = ["content", "createdAt", "updatedAt", "sender"];

exports.validateGetMessagesQuery = [
  param("id", "Need id of related conversation")
    .custom(isValidMongoId)
    .withMessage("Provided conversation id is not valid")
    .custom(idExists(Conversation))
    .withMessage("No conversation found with provided id"),
  query("sort")
    .default("createdAt")
    .isString()
    .isIn(messageSortFields)
    .withMessage(
      `Must provide a sort field relevant to a message: ${messageSortFields.join(
        " | "
      )}`
    ),
  query("order")
    .default("asc")
    .isString()
    .isIn(["asc", "desc"])
    .withMessage(
      "Must provide either 'asc' or 'desc' when querying the order."
    ),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];

exports.validateOtherUserId = [
  check("otherUserId", "Need id of related conversation")
    .custom(isValidMongoId)
    .withMessage("Provided user id is not valid")
    .custom(idExists(User))
    .withMessage("No user found with provided id"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(404).json({ errors: errors.array() });

    next();
  },
];

exports.validateMessageData = [
  param("id", "Need id of related conversation")
    .custom(isValidMongoId)
    .withMessage("Provided conversation id is not valid")
    .custom(idExists(Conversation))
    .withMessage("No conversation found with provided id"),
  check("content")
    .isString()
    .isLength({ min: 1, max: Infinity })
    .withMessage("content must contain at least one character"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    next();
  },
];
