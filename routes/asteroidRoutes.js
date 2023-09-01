const express = require("express");
const AsteroidController = require("../controllers/asteroidController");

const router = express.Router();
const asteroidController = new AsteroidController();

router.get("/:asteroidId", asteroidController.getAsteroidDetails);
router.get("/", asteroidController.getAsteroidList);

module.exports = router;
