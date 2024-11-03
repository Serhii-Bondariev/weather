const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
  const APIkey = 'feabd72c26995056a7e658f68286456f';
  const city = document.querySelector('.search-box input').value;

  if (city === '') {
    alert('Please write the city name');
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
  )
    .then(res => res.json())
    .then(json => {
      if (json.cod === '404') {
        cityHide.textContent = city;
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
      }

      if (cityHide.textContent === city) return;

      cityHide.textContent = city;
      container.style.height = '555px';
      weatherBox.classList.add('active');
      weatherDetails.classList.add('active');
      error404.classList.remove('active');

      setTimeout(() => {
        container.classList.remove('active');
      }, 2500);

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector(
        '.weather-details .humidity span'
      );
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.png';
          break;
        case 'Rain':
          image.src = 'images/rain.png';
          break;
        case 'Snow':
          image.src = 'images/snow.png';
          break;
        case 'Clouds':
          image.src = 'images/cloud.png';
          break;
        case 'Haze':
        case 'Mist':
          image.src = 'images/mist.png';
          break;
        default:
          image.src = 'images/default.png';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = json.weather[0].description;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

      const infoWeather = document.querySelector('.info-weather');
      const infoHumidity = document.querySelector('.info-humidity');
      const infoWind = document.querySelector('.info-wind');

      // Клонування елементів
      const elCloneInfoWeather = infoWeather.cloneNode(true);
      const elCloneInfoHumidity = infoHumidity.cloneNode(true);
      const elCloneInfoWind = infoWind.cloneNode(true);

      elCloneInfoWeather.id = 'clone-info-weather';
      elCloneInfoWeather.classList.add('active-clone');
      elCloneInfoHumidity.id = 'clone-info-humidity';
      elCloneInfoHumidity.classList.add('active-clone');
      elCloneInfoWind.id = 'clone-info-wind';
      elCloneInfoWind.classList.add('active-clone');

      setTimeout(() => {
        infoWeather.insertAdjacentElement('afterend', elCloneInfoWeather);
        infoHumidity.insertAdjacentElement('afterend', elCloneInfoHumidity);
        infoWind.insertAdjacentElement('afterend', elCloneInfoWind);
      }, 2200);

      // Видалення старих клонованих елементів
      const cloneInfoWeather = document.querySelectorAll(
        '#clone-info-weather.active-clone'
      );
      const cloneInfoHumidity = document.querySelectorAll(
        '#clone-info-humidity.active-clone'
      );
      const cloneInfoWind = document.querySelectorAll(
        '#clone-info-wind.active-clone'
      );

      if (cloneInfoWeather.length > 0) {
        cloneInfoWeather[0].classList.remove('active-clone');
        cloneInfoHumidity[0].classList.remove('active-clone');
        cloneInfoWind[0].classList.remove('active-clone');

        setTimeout(() => {
          cloneInfoWeather[0].remove();
          cloneInfoHumidity[0].remove();
          cloneInfoWind[0].remove();
        }, 2200);
      }
    })
    .catch(() => {
      alert('City not found');
    });
});
