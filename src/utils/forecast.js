const request = require('request');


const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/c3f07316520bdf4d1b67e6f0a0f3d07d/${lat},${long}`;

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else if (body.code === 400) {
      callback('Invalid location');
    } else {
      const tempature = body.currently.temperature;
      const percipitation = body.currently.precipProbability;
      const dailySummary = body.daily.data[0].summary;
      callback(undefined, `${dailySummary} It is currently ${tempature} degrees out. There is a ${percipitation}% chance of rain.`);
    }
  });

};

module.exports = forecast;