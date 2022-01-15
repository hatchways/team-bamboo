const Notification = require("../models/Notification");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");

exports.createNotification = asyncHandler(async (req, res, next) => {
  // received from "protected" middleware function
  const {
    user,
    body: { notifyType, title, description, receivers },
  } = req;

  const sender = await Profile.findOne({ userId: user.id });

  if (!sender) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const notification = await new Notification({
    sender: sender.id,
    notifyType,
    title,
    description,
    receivers,
  }).save();

  if (notification) {
    res.status(201).json({
      success: {
        notification: {
          id: notification.id,
          notifyType: notification.notifyType,
          title: notification.title,
          description: notification.description,
          sender: {
            userId: user.id,
            name: sender.name,
            photo: sender.photo,
          },
          receivers: notification.receivers,
          readBy: notification.readBy,
          createdAt: notification.createdAt,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid notification data");
  }
});

exports.markNotificationRead = asyncHandler(async (req, res, next) => {
  const {
    user,
    body: { id },
  } = req;

  const receiver = await User.findById(user.id);

  if (!receiver) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const query = {
    _id: id,
    receivers: {
      $in: receiver.id,
    },
  };

  const data = {
    $set: {
      readBy: {
        receiverId: receiver.id,
      },
    },
  };

  const notification = await Notification.findOneAndUpdate(query, data, {
    new: true,
  })
    .populate({
      path: "sender",
      select: "userId name photo",
    })
    .select("-receivers -__v -updatedAt")
    .exec();

  if (notification) {
    res.status(201).json({
      success: {
        notification,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid notification data");
  }
});

exports.getAllNotifications = asyncHandler(async (req, res, next) => {
  // Other properties are here in case we need to paginate all of the notifications.
  const {
    query: {
      limit = Infinity,
      page = 1,
      read = null,
      sort = "createdAt",
      order = 1,
    },
    user,
  } = req;

  const receiver = await User.findById(user.id);

  if (!receiver) {
    res.status(401);
    throw new Error("Not authorized");
  }

  let query = {
    receivers: {
      $in: receiver.id,
    },
  };

  const total = await Notification.countDocuments(query);

  if (read === "true") {
    query = {
      receivers: {
        $in: receiver.id,
      },
      readBy: {
        $elemMatch: {
          receiverId: receiver.id,
        },
      },
    };
  } else if (read === "false") {
    query = {
      receivers: {
        $in: receiver.id,
      },
      readBy: {
        $not: {
          $elemMatch: {
            receiverId: receiver.id,
          },
        },
      },
    };
  }

  const notifications = await Notification.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ [sort]: parseInt(order) })
    .populate({
      path: "sender",
      select: "userId name photo",
    })
    .select("-receivers -__v -updatedAt")
    .exec();

  if (notifications) {
    res.status(200).json({
      success: {
        notifications,
        total,
      },
    });
  } else {
    throw new Error("Unable to find any notifications for user");
  }
});
