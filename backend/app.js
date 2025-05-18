import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import WebSocket from "ws";

const app = express();
const port = 4000;

const corsOptions = {
  origin: "*",
};

app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Back and Front successfully connected." });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
