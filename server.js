const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8500;

const corsOptions = {
  origin: "http://localhost:4301",
};
app.use(cors(corsOptions));

app.get("/posts", (req, res) => {
  res.status(200).send({ mesage: "Hello World" });
  //   res.send("<h1>Hello</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
