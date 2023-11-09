const express = require("express"); // include in the node_modules
const app = express();
//routes
app.get("/", (req, res) => {
  res.send("hello node api");
});
app.listen(3000, () => {
  console.log("node Api app is running on port 3000");
});
