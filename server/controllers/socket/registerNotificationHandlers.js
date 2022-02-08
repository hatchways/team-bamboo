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

const markNotificationRead = (io, socket) => async () => {
  const { user } = socket.request;

  if (onlineUsers.has(user.id)) {
    const mainSocket = onlineUsers.get(user.id);

    if (mainSocket !== socket.id) {
      socket.to(mainSocket).emit("mark-notification-read");
    } else {
      const connectedSockets = await getConnectedSockets(io, mainSocket);
      if (connectedSockets.length) {
        io.to(connectedSockets).emit("mark-notification-read");
      }
    }
  }
};

module.exports = (io, socket) => {
  socket.on("send-notification", sendNotification(socket));
  socket.on("mark-notification-read", markNotificationRead(io, socket));
};
