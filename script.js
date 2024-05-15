document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '4cf8c82db85343f1bfbc039a273bb4e7';
  const city = 'Willoughby,us';
  const weatherElement = document.getElementById('weather-data');
  const forecastElement = document.getElementById('forecast');
  const quoteElement = document.getElementById('quote');
  const sunriseSunsetElement = document.getElementById('sunrise-sunset');
  const countdownElement = document.getElementById('countdown');
  const countdownElement2 = document.getElementById('countdown2');
  const clockElement = document.getElementById('clock');
  const dateElement = document.getElementById('date');

  // Update clock and date
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);

    clockElement.textContent = formattedTime;
    dateElement.textContent = formattedDate;
  }

  setInterval(updateClock, 1000);
  updateClock();

  // Fetch current weather data
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const temp = Math.round(data.main.temp); // Temperature in Fahrenheit
      const weatherDescription = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      // Convert sunrise and sunset from UNIX timestamp to local time
      const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      weatherElement.innerHTML = `
        Temperature: ${temp}°F<br>
        Weather: ${weatherDescription}<br>
        Humidity: ${humidity}%<br>
        Wind Speed: ${windSpeed} m/s
      `;

      sunriseSunsetElement.innerHTML = `
        Sunrise: ${sunrise}<br>
        Sunset: ${sunset}
      `;
    })
    .catch(error => {
      weatherElement.textContent = 'Unable to fetch weather data';
      sunriseSunsetElement.textContent = 'Unable to fetch sunrise and sunset times';
      console.error('Error fetching weather data:', error);
    });

  // Fetch 5-day forecast data
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`)
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
        const temp = Math.round(forecast.main.temp); // Temperature in Fahrenheit
        const icon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        const description = forecast.weather[0].description;

        forecastHTML += `
          <div class="forecast-day">
            <h3>${day}</h3>
            <img src="${icon}" class="forecast-icon" alt="${description}">
            <p>${temp}°F</p>
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

  // Fetch quote of the day
  fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      quoteElement.textContent = `"${data.content}" — ${data.author}`;
    })
    .catch(error => {
      quoteElement.textContent = 'Unable to fetch quote';
      console.error('Error fetching quote:', error);
    });

  // Set the background image
  const backgroundImage = 'https://wallpaperaccess.com/full/31193.jpg';
  document.body.style.backgroundImage = `url(${backgroundImage})`;

  // Countdown timer
  function updateCountdown(targetDate, element) {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      element.innerHTML = "The countdown is over!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // Set the target date and time for the countdowns
  const targetDate1 = new Date("May 22, 2024 15:00:00 EST").getTime();
  const targetDate2 = new Date("June 7, 2024 09:00:00 EST").getTime();
  updateCountdown(targetDate1, countdownElement);
  updateCountdown(targetDate2, countdownElement2);
  setInterval(() => updateCountdown(targetDate1, countdownElement), 1000);
  setInterval(() => updateCountdown(targetDate2, countdownElement2), 1000);
});
