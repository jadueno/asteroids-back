const AsteroidService = require("../services/asteroidService");
const asteroidService = new AsteroidService();

class AsteroidController {
  async getAsteroidList(req, res) {
    try {
      const asteroidList = await asteroidService.getAsteroidList(req.query);
      res.json(asteroidList);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error when obtaining the list of asteroids." });
    }
  }

  async getAsteroidDetails(req, res) {
    try {
      const asteroidId = req.params.asteroidId;
      const asteroid = await asteroidService.getAsteroidDetails(asteroidId);
      res.json(asteroid);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error getting asteroid details." });
    }
  }
}

module.exports = AsteroidController;
