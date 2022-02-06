const onlineUsers = require("../../globals/onlineUsers");

const getConnectedSockets = async (io, mainSocket) =>
  Array.from(await io.in(mainSocket).fetchSockets()).reduce((acc, socket) => {
    if (socket.id !== mainSocket) {
      acc.push(socket.id);
    }
    return acc;
  }, []);

const sendNotification = (socket) => (receivers) => {
  receivers.forEach(({ id }) => {
    if (onlineUsers.has(id)) {
      const receiverSocketId = onlineUsers.get(id);
      socket.to(receiverSocketId).emit("new-notification");
    }
  });
};

const triggerRequestNotification = (socket) => async (receivers) => {
  const sender = await Profile.findOne({
    userId: socket.request.user.id,
  }).exec();

  await new Notification({
    sender: sender.id,
    notifyType: "user",
    title: "Dog Sitting",
    description: `${sender.name} has request your service for 2 hours.`,
    receivers,
  }).save();

  receivers.forEach(({ id }) => {
    if (onlineUsers.has(id)) {
      const receiverSocketId = onlineUsers.get(id);
      socket.to(receiverSocketId).emit("new-notification");
    }
  });
};

const triggerMessageNotification = (socket) => async (receivers) => {
  const sender = await Profile.findOne({
    userId: socket.request.user.id,
  }).exec();

  await new Notification({
    sender: sender.id,
    notifyType: "message",
    title: "Message Received",
    description: `${sender.name} sent you a message`,
    receivers,
  }).save();

  receivers.forEach(({ id }) => {
    if (onlineUsers.has(id)) {
      const receiverSocketId = onlineUsers.get(id);
      socket.to(receiverSocketId).emit("new-notification");
    }
  });
};

const markNotificationRead = (io, socket) => async () => {
  const { user } = socket.request;

  if (onlineUsers.has(user.id)) {
    const mainSocket = onlineUsers.get(user.id);

    if (mainSocket !== socket.id) {
      socket.to(mainSocket).emit("mark-notification-read");
    } else {
      const connectedSockets = await getConnectedSockets(io, mainSocket);
      io.to(connectedSockets).emit("mark-notification-read");
    }
  }
};

module.exports = (io, socket) => {
  socket.on("send-notification", sendNotification(socket));
  socket.on("mark-notification-read", markNotificationRead(io, socket));
  socket.on("trigger-request-notification", triggerRequestNotification(socket));
  socket.on("trigger-message-notification", triggerMessageNotification(socket));
};
