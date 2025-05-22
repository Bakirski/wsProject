import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const port = 4000;

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const corsOptions = {
  origin: "*",
};

app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ChatRoom Live!" });
});

wss.on("connection", (ws) => {
  ws.username = "Anonymous";

  ws.on("message", (msg) => {
    try {
      const parsed = JSON.parse(msg);
      if (parsed.type === "register") {
        ws.username = parsed.username || "Anonymous";
        updateUserCount();
      } else if (parsed.type === "chat") {
        const data = {
          username: ws.username,
          message: parsed.message,
        };
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        });
      }
    } catch (e) {
      console.error("Invalid message format", e);
    }
  });

  ws.on("close", () => {
    updateUserCount();
  });
});

function updateUserCount() {
  const count = [...wss.clients].filter(
    (c) => c.readyState === WebSocket.OPEN
  ).length;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "userCount",
          count: count,
        })
      );
    }
  });
}

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
