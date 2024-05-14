document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '4cf8c82db85343f1bfbc039a273bb4e7';
  const city = 'Willoughby,us';
  const weatherElement = document.getElementById('weather-data');
  const forecastElement = document.getElementById('forecast');

  // Fetch current weather data
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

  // Fetch 5-day forecast data
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      const forecastList = data.list;
      let forecastHTML = '';

      // Extract one forecast per day (e.g., at 12:00 each day)
      for (let i = 0; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(forecast.main.temp - 273.15); // Convert from Kelvin to Celsius
        const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        const description = forecast.weather[0].description;

        forecastHTML += `
          <div class="forecast-day">
            <h3>${day}</h3>
            <img src="${icon}" class="forecast-icon" alt="${description}">
            <p>${temp}°C</p>
            <p>${description}</p>
          </div>
        `;
      }

      forecastElement.innerHTML = forecastHTML;
    })
    .catch(error => {
      forecastElement.innerHTML = 'Unable to fetch forecast data';
      console.error('Error fetching forecast data:', error);
    });

  // Array of background images
  const backgroundImages = [
    'https://wallpaperaccess.com/full/31193.jpg',
    'https://tpc.googlesyndication.com/simgad/11737315947385431178?sqp=4sqPyQQ7QjkqNxABHQAAtEIgASgBMAk4A0DwkwlYAWBfcAKAAQGIAQGdAQAAgD-oAQGwAYCt4gS4AV_FAS2ynT4&rs=AOga4qkW_x9Wa1x7rrxurRUTCSm_TPzX5w'
  ];

  let currentImageIndex = 0;

  function changeBackgroundImage() {
    document.body.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
  }

  // Initial background image
  changeBackgroundImage();

  // Change background image every 10 minutes (600000 milliseconds)
  setInterval(changeBackgroundImage, 600000);
});
