const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// defines paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory for serve
app.use(express.static(publicDirectory));

// home page
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Mike Henze'
  });
});

// about page
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mike Henze'
  });
});

// help page
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Mike Henze',
    message: 'Learning Nodejs'
  });
});

// weather page
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must provide an address'
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error});
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mike Henze',
    errorMessage: 'Help Article Not Found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Mike Henze',
    errorMessage: 'Page Not Found'
  });
});

// starting server
app.listen(3000, () => {
  console.log('server running on port 3000.');
});