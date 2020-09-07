"use strict";

const config = require("./api/config.json");
const express = require("express");
const getApiRouter = require("./api/src/index.js");

(async () => {
  try {
    const app = express();

    const apiRouter = getApiRouter(express.Router());

    const PORT = process.env.PORT || config.port;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/", express.static(__dirname + "/frontend/public"));
    app.use("/api", apiRouter);

    app.get("*", (request, response) => {
      response.sendFile(__dirname + "/frontend/public/index.html");
    });

    app.use("*", (request, response) => response.status(404).end("Not Found page"));

    app.listen(PORT, () => console.log("Running on: http://localhost:" + PORT));
  } catch (error) {
    console.error("ServerError: ", error);
  }
})();

// console.log(new Date().toLocaleString("default", { timeZone: "Europe/Amsterdam" }));
// npm i geo-tz
