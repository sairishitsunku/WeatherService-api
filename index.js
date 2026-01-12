const { getWeather } = require("./weatherService");

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
  console.log('Usage: node index.js "City Name"');
  console.log('\nExample: node index.js "London"');
  process.exit(0);
}

const city = args.join(" ");

(async () => {
  try {
    const result = await getWeather(city);
    console.log(`Weather in ${result.city}: ${result.tempC}°C, ${result.description}`);
    process.exit(0);
  } catch (err) {
    if (err.message === 'Invalid city') {
      console.error('❌ Please provide a valid city name.');
      process.exit(1);
    } else if (err.message.startsWith('HTTP')) {
      console.error('❌ Failed to fetch weather data (network error).');
      process.exit(2);
    } else {
      console.error(`❌ ${err.message}`);
      process.exit(1);
    }
  }
})();
