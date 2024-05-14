document.addEventListener('DOMContentLoaded', function() {
  const apiKey = 4cf8c82db85343f1bfbc039a273bb4e7;
  const city = 44094;
  const weatherElement = document.getElementById('weather-data');

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const temp = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
      weatherElement.textContent = `Temperature: ${temp}°C`;
    })
    .catch(error => {
      weatherElement.textContent = 'Unable to fetch weather data';
      console.error('Error fetching weather data:', error);
    });
});