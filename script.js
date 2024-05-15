document.addEventListener('DOMContentLoaded', function() {
  const countdownElement = document.getElementById('countdown');
  const countdownElement2 = document.getElementById('countdown2');
  const clockElement = document.getElementById('clock');
  const dateElement = document.getElementById('date');
  const quoteElement = document.getElementById('quote');

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
