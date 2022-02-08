const onlineUsers = require("../../globals/onlineUsers");

const removeOnlineUser = (io, socket) => async () => {
  const { user } = socket.request;

  if (onlineUsers.has(user.id)) {
    const mainSocket = onlineUsers.get(user.id);

    // fetches all sockets other than main socket
    const sockets = await io.in(mainSocket).fetchSockets();

    // completely removes user from being online if no other sockets are connected to the mainSocket.
    if (sockets.length === 0) {
      onlineUsers.delete(user.id);
    } else if (mainSocket === socket.id) {
      // Sets first socket in array to be the main socket
      onlineUsers.set(user.id, sockets[0].id);

      // updates all of the other sockets to be connected to the mainSocket
      io.in(sockets).socketsJoin(onlineUsers.get(user.id));
    }
  }

  console.log(`${user.name} disconnected from ${socket.id}`);
  socket.broadcast.emit("remove-online-user", user.id);
};

const addOnlineUser = (socket) => {
  const { user } = socket.request;
  console.log(`${user.name} connected to ${socket.id}`);

  if (!onlineUsers.has(user.id)) {
    onlineUsers.set(user.id, socket.id);
    socket.broadcast.emit("add-online-user", user.id);
  } else {
    socket.join(onlineUsers.get(user.id));
  }
};

module.exports = (io, socket) => {
  addOnlineUser(socket);

  socket.on("disconnect", removeOnlineUser(io, socket));
};
