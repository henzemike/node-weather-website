const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWlrZWhlbnplIiwiYSI6ImNqdDh3dG4zejBkZXQ0NG1nZDVuMG8xNDgifQ.04p_7I8PKwsNgmfN3uyxIA&limit=1`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to location services');
    } else if (body.features.length === 0) {
      callback('Invalid location');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;