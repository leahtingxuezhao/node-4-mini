require("dotenv").config();
const express = require("express");
const session = require("express-session");
const messagesCtrl = require("./messagesCtrl");

let { SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    reSave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.get("/api/messages", messagesCtrl.getAllMessages);
app.post("/api/message", messagesCtrl.createMessage);
app.get("/api/messages/history", messagesCtrl.history);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}.`);
});
