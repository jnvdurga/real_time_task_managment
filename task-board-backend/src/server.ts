import app from "./app";
import { createServer } from "http";
import { initSocket } from "./infrastructure/socket/socket";

const PORT = 5000;

const server = createServer(app);

// 🔥 Initialize socket
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
