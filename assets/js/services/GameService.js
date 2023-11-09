import Game from "./Game.js";
import { eventBus } from "./EventBus.js";
import { platformsParentsUrl, searchUrl } from "../utils/prod.env.js";

export const gameService = new (class {
  constructor() {}

  getGameData = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données de jeux.");
      }

      const data = await response.json();

      eventBus.fire('dataReady', this);

      console.log(data.results);

      return data.results.map(
        (gameData) => new Game(...Object.values(gameData))
      );
    } catch (error) {
      console.error(error);
    }
  };

  getNextUrl = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données de jeux.");
      }

      const data = await response.json();

      eventBus.fire('nextDataReady', this);

      console.log(data.next);

      return data.next;
    } catch (error) {
      console.error(error);
    }
  };

  searchGameData = async (query) => {
    try {
      const url = searchUrl(query);
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données de jeux.");
      }
  
      const data = await response.json();
  
      eventBus.fire('searchDataReady', this);
  
      // console.log(data.results);
  
      return data.results.map(
        (gameData) => new Game(...Object.values(gameData))
      );
    } catch (error) {
      console.error(error);
    }
  };

  getPlatformsParents = async () => {
    try {
      const response = await fetch(platformsParentsUrl);

      if (!response.ok) {
        throw new Error("Erreur!");
      }

      const data = await response.json();

      return data.results;

    } catch (error) {
      console.error(error);
    }
  }

});
