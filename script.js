body {
  background-size: cover;
  background-position: center;
  transition: background-image 1s ease-in-out;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
}

.carousel-container {
  width: 90%;
  max-width: 1200px;
  overflow: hidden;
}

.carousel-slide {
  display: flex;
  transition: transform 1s ease-in-out;
}

.carousel-item {
  flex: 0 0 25%; /* Show 4 items at a time */
  box-sizing: border-box;
  padding: 20px;
}

.section {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
}

.left {
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
}

h1 {
  text-align: center;
  margin: 10px 0;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 3em;
}

h2 {
  font-size: 2.5em;
  text-align: center;
}

#quote {
  text-align: center;
  margin: 10px 0;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-style: italic;
  font-size: 2em;
}

#weather, #forecast {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
}

#forecast {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.forecast-day {
  text-align: center;
  margin: 10px;
}

.forecast-icon {
  width: 60px;
  height: 60px;
}

iframe {
  border-width: 0;
  width: 100%;
  height: 500px;
}

#countdown {
  text-align: center;
  font-size: 2.5em;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Responsive styles */
@media (max-width: 1200px) {
  h1 {
    font-size: 2.5em;
  }
  h2 {
    font-size: 2em;
  }
  #quote {
    font-size: 1.5em;
  }
  #countdown {
    font-size: 2em;
  }
}

@media (max-width: 800px) {
  .carousel-container {
    flex-direction: column;
    align-items: center;
  }
  .carousel-item {
    width: 100%;
    margin: 10px 0;
  }
  iframe {
    height: 400px;
  }
}

@media (max-width: 500px) {
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  #quote {
    font-size: 1.2em;
  }
  #countdown {
    font-size: 1.5em;
  }
  .forecast-icon {
    width: 40px;
    height: 40px;
  }
  iframe {
    height: 300px;
  }
}
