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
    https://wallpaperaccess.com/full/969650.jpg,
    https://wallpaperaccess.com/full/31193.jpg
    // Add more URLs as needed
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
