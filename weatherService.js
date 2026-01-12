const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const { statusCode } = res;
        let data = '';

        res.on('data', (chunk) => (data += chunk));

        res.on('end', () => {
          if (statusCode < 200 || statusCode >= 300) {
            return reject(new Error(`HTTP ${statusCode}`));
          }

          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (err) {
            reject(new Error('Invalid JSON received'));
          }
        });
      })
      .on('error', (err) => reject(err));
  });
}

async function getWeather(city) {
  if (!city || typeof city !== 'string' || city.trim() === '') {
    throw new Error('Invalid city');
  }

  const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
  const data = await fetchJson(url);

  if (!data || !data.current_condition || !data.current_condition.length) {
    throw new Error('Unexpected API response');
  }

  const current = data.current_condition[0];

  return {
    city,
    tempC: current.temp_C,
    description:
      current.weatherDesc && current.weatherDesc[0] && current.weatherDesc[0].value
  };
}

module.exports = { getWeather, fetchJson }; 
