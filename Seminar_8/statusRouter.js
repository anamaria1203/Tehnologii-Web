const express = require("express");
const statusRouter = express.Router();

statusRouter.route("/status").get((req, res) => {
  res.status(200).json({
    message: "Serverul funcționează!",
    status: "OK",
  });
});

module.exports = statusRouter;
