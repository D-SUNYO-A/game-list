const APIKEY = "bdcc4010f2ab48e884c08d2e73080f9e";
const DATES = "2022-01-01,2023-11-01";
const ORDERING = "-added";

// URL pour recuperer la list des jeux 
export const url = `https://api.rawg.io/api/games?key=${APIKEY}&dates=${DATES}&ordering=${ORDERING}`;

// URL pour la liste des plateformes parents
export const platformsParentsUrl = `https://api.rawg.io/api/platforms/lists/parents?key=${APIKEY}&dates=${DATES}&ordering=${ORDERING}`

// URL pour la recherche de jeux
export const searchUrl = query => `https://api.rawg.io/api/games?key=${APIKEY}&dates=${DATES}&ordering=${ORDERING}&search=${query}`;