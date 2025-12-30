"use strict";

const express = require("express");
const sequelize = require("./sequelize");
const employeeRouter = require("./routes/employeeRouter");

const app = express();

//Permite serverului să citească JSON pentru POST
app.use(express.json());

app.set("port", process.env.PORT || 7000);

app.use("/api", employeeRouter);

app.listen(app.get("port"), async () => {
  console.log(`Server started on http://localhost:${app.get("port")}`);
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("Database connected and synchronized.");
  } catch (error) {
    console.error("Error:", error);
  }
});
