const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const inputLocation = document.querySelector('#location');
const inputForecast = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  inputLocation.textContent = 'Loading content...';
  inputForecast.textContent = '';

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        inputLocation.textContent = data.error;
      } else {
        inputLocation.textContent = data.location;
        inputForecast.textContent = data.forecast;
      }
    });
  });
  search.value = '';
});