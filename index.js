const { getWeather } = require("./weatherService");

const city = process.argv.slice(2).join(" ");

if (!city) {
  console.log("❌ Please provide a city name");
  process.exit(1);
}

getWeather(city);
