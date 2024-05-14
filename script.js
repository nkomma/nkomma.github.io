document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '4cf8c82db85343f1bfbc039a273bb4e7';
  const city = 'Willoughby,us';
  const weatherElement = document.getElementById('weather-data');

  // Fetch weather data
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const temp = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
      const weatherDescription = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      weatherElement.innerHTML = `
        Temperature: ${temp}°C<br>
        Weather: ${weatherDescription}<br>
        Humidity: ${humidity}%<br>
        Wind Speed: ${windSpeed} m/s
      `;
    })
    .catch(error => {
      weatherElement.textContent = 'Unable to fetch weather data';
      console.error('Error fetching weather data:', error);
    });

  // Array of background images
  const backgroundImages = [
    'https://wallpaperaccess.com/full/31193.jpg',
    'https://tpc.googlesyndication.com/simgad/11737315947385431178?sqp=4sqPyQQ7QjkqNxABHQAAtEIgASgBMAk4A0DwkwlYAWBfcAKAAQGIAQGdAQAAgD-oAQGwAYCt4gS4AV_FAS2ynT4&rs=AOga4qkW_x9Wa1x7rrxurRUTCSm_TPzX5w'
  ];

  let currentImageIndex = 0;

  function changeBackgroundImage() {
    document.body.style.backgroundImage 
