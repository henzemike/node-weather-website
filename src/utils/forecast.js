const request = require('request');
require('dotenv').config();

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/${process.env.DB_PASSWORD}/${lat},${long}`;

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service');
    } else if (body.code === 400) {
      callback('Invalid location');
    } else {
      const tempature = body.currently.temperature;
      const percipitation = body.currently.precipProbability;
      const dailySummary = body.daily.data[0].summary;
      const tempatureHigh = body.daily.data[0].temperatureHigh;
      const tempatureLow = body.daily.data[0].temperatureLow;

      callback(undefined, `${dailySummary} It is currently ${tempature} degrees out, we are expecting tempatures as high as ${tempatureHigh} with the low being ${tempatureLow}. There is a ${percipitation}% chance of rain as of now.`);
    }
  });

};

module.exports = forecast;