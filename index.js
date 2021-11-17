const express = require("express");
const app = express();

const inventory = require("./routes/inventory");
const sales = require("./routes/sales");

app.use(express.json());
app.use("/api/inventory", inventory);
app.use("/api/sales", sales);

const port = process.env.PORT || "8080";

const server = app.listen(port, () => {
  console.log(`galalive application listening on port ${port}`);
});
