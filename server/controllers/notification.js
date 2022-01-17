const Notification = require("../models/Notification");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");

exports.createNotification = asyncHandler(async (req, res, next) => {
  const {
    user,
    body: { notifyType, title, description, receivers },
  } = req;

  const sender = await Profile.findOne({ userId: user.id });

  const notification = await new Notification({
    sender: sender.id,
    notifyType,
    title,
    description,
    receivers: receivers.filter((receiver) => receiver.id !== user.id),
  }).save();

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
        createdAt: notification.createdAt,
      },
    },
  });
});

exports.markNotificationRead = asyncHandler(async (req, res, next) => {
  const {
    user,
    params: { id },
  } = req;

  const receiver = await User.findById(user.id);

  const query = {
    _id: id,
    receivers: {
      $elemMatch: {
        id: receiver.id,
      },
    },
  };

  const notification = await Notification.findOne(query).populate({
    path: "sender",
    select: "userId name photo",
  });

  notification.receivers.forEach((r) => {
    if (r.id.toString() === receiver.id.toString()) {
      r.read = true;
      r.readAt = new Date(Date.now());
    }
  });

  await notification.save();

  res.status(200).json({
    success: {
      notification: {
        id: notification.id,
        notifyType: notification.notifyType,
        title: notification.title,
        description: notification.description,
        sender: {
          userId: notification.sender.userId,
          name: notification.sender.name,
          photo: notification.sender.photo,
        },
        receivers: notification.receivers,
        createdAt: notification.createdAt,
      },
    },
  });
});

exports.getNotifications = asyncHandler(async (req, res, next) => {
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

  let query = {
    receivers: {
      $elemMatch: {
        id: receiver.id,
      },
    },
  };

  const total = await Notification.countDocuments(query);

  if (read === "true") {
    query = {
      receivers: {
        $elemMatch: {
          id: receiver.id,
          read: true,
        },
      },
    };
  } else if (read === "false") {
    query = {
      receivers: {
        $elemMatch: {
          id: receiver.id,
          read: false,
        },
      },
    };
  }

  const notifications = await Notification.find(query)
    .skip((parseInt(page) - 1) * limit)
    .limit(parseInt(limit))
    .sort({ [sort]: order })
    .populate({
      path: "sender",
      select: "userId name photo",
    })
    .select("-__v -updatedAt");

  res.status(200).json({
    success: {
      notifications: notifications.map((notification) => {
        return {
          id: notification._id,
          notifyType: notification.notifyType,
          title: notification.title,
          description: notification.description,
          sender: {
            userId: notification.sender.userId,
            name: notification.sender.name,
            photo: notification.sender.photo,
          },
          receivers: notification.receivers,
          createdAt: notification.createdAt,
        };
      }),
      total,
    },
  });
});
