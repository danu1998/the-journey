const express = require("express");
const app = express();
const PORT = 5000;
app.listen(PORT, () => console.log(`Port run on ${PORT}`));
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
const router = require("./src/routes");
app.use("/api/v1/", router);
