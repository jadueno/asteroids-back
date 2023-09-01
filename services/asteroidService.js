const axios = require("axios");
const { NASA_API_KEY, NASA_API_URL } = require("../config/config");
const Asteroid = require("../models/asteroidModel");

class AsteroidService {
  async getAsteroidList(queryParams) {
    try {
      const response = await axios.get(NASA_API_URL + "/feed", {
        params: {
          start_date: queryParams.start_date,
          end_date: queryParams.end_date,
          api_key: NASA_API_KEY,
        },
      });

      const asteroidsData = response.data.near_earth_objects;
      const formattedAsteroids = this.formatAsteroidsData(asteroidsData);

      return formattedAsteroids;
    } catch (error) {
      console.error("Error getting list of asteroids:", error);
      throw new Error("Could not get list of asteroids");
    }
  }

  async getAsteroidDetails(asteroidId) {
    try {
      const response = await axios.get(NASA_API_URL + "/neo/" + asteroidId, {
        params: {
          api_key: NASA_API_KEY,
        },
      });

      const asteroid = response.data;

      return asteroid;
    } catch (error) {
      console.error("Error getting asteroid data:", error);
      throw new Error("Asteroid not found");
    }
  }

  formatAsteroidsData(asteroidsData) {
    const formattedAsteroids = [];

    for (const date in asteroidsData) {
      const asteroids = asteroidsData[date];
      formattedAsteroids.push(
        ...asteroids.map(
          (asteroid) =>
            new Asteroid(
              asteroid.id,
              asteroid.name,
              asteroid.absolute_magnitude_h,
              asteroid.estimated_diameter.kilometers.estimated_diameter_max,
              asteroid.is_potentially_hazardous_asteroid
            )
        )
      );
    }

    return formattedAsteroids;
  }
}

module.exports = AsteroidService;
