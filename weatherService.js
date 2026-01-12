const https = require("https");

function getWeather(city) {
  const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;

  https
    .get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => (data += chunk));

      res.on("end", () => {
        try {
          const weather = JSON.parse(data);
          const current = weather.current_condition[0];

          console.log(
            `Weather in ${city}: ${current.temp_C}°C, ${current.weatherDesc[0].value}`
          );
        } catch (err) {
          console.log("❌ Could not parse weather data");
        }
      });
    })
    .on("error", () => {
      console.log("❌ Failed to fetch weather data");
    });
}

module.exports = { getWeather };
