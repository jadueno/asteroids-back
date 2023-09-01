const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/config");
const asteroidRoutes = require("./routes/asteroidRoutes");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/asteroids", asteroidRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
