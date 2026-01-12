const assert = require('assert');
const { getWeather } = require('../weatherService');

(async () => {
  try {
    const res = await getWeather('London');
    assert.ok(res && res.tempC !== undefined, 'tempC should be present');
    assert.ok(res.description, 'description should be present');
    console.log('✅ test passed');
    process.exit(0);
  } catch (err) {
    console.error('❌ test failed:', err.message || err);
    process.exit(1);
  }
})();