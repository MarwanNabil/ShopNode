let io;

module.exports = {
  init: (httpServer, serverResponse) => {
    io = require("socket.io")(httpServer, serverResponse);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not intialized!");
    }
    return io;
  },
};
