require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const api = require("./api");
const morgan = require("morgan");
const { tokenValidation } = require("./middleware");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./specs/swagger.json");

console.log(process.env.NODE_ENV);

const allowedCorsOrigin =
  process.env.NODE_ENV === "development"
    ? "*"
    : "https://focused-carson-2ae3a4.netlify.app";

app.use(morgan("tiny"));
app.use(cors());
app.use("/static", express.static("static"));
app.use(express.json());

app.set("views", "./templates");
app.set("view engine", "pug");

app.use("/api/v1/auth", api.auth);
app.use("/api/v1/users", tokenValidation, api.users);
app.use("/api/v1/images", tokenValidation, api.images);
app.use("/api/v1/public", api.public);
app.use("/api/v1/interface", api.interface);
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: "404",
    message: "Not found!",
  });
  return;
});

app.use((error, _, res, __) => {
  const { code = 500, message = "Server error." } = error;
  res.status(code).json({
    status: "error",
    code,
    message,
  });
});

module.exports = app;
