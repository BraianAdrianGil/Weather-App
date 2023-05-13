import { useEffect, useState } from "react";
import { getCoordinates } from "../services/getCoordinates";
import { getCurrentWeather } from "../services/getCurrentWeather";
import { getCurrentWeatherByCity } from "../services/getCurrentWeatherByCity";
import "./WeatherCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

const WeatherCard = () => {
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [cityInput, setCityInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const loadWeather = async () => {
    if (cityInput) {
      const weatherData = await getCurrentWeatherByCity(cityInput);
      setWeather(weatherData);
    } else {
      const coordinates = await getCoordinates();

      if (coordinates) {
        const weatherData = await getCurrentWeather(
          coordinates.latitude,
          coordinates.longitude
        );
        setWeather(weatherData);
      } else {
        console.log("No se dieron permisos");
      }
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  const handleChange = (event) => {
    setCityInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loadWeather();
    setCityInput("");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      {weather ? (
        <div
          className={`weather__general__container ${
            isDarkMode ? "dark-mode" : ""
          }`}
        >
          <div className="weather__btn__general__container">
            <div className="weather__form__container">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={cityInput}
                  onChange={handleChange}
                  placeholder="Ingrese una ciudad"
                  className={isDarkMode ? "dark__mode" : ""}
                />
                <button
                  type="submit"
                  className={isDarkMode ? "dark__mode" : ""}
                >
                  <i className="bx bx-search"></i>
                </button>
              </form>
            </div>
            <div
              className="btn__general__slider__container"
              onClick={toggleTheme}
            >
              <button
                className={`btn__slider__container ${
                  isDarkMode ? "dark__mode" : " "
                }`}
                onClick={toggleTheme}
              >
                <div
                  className={`btn__slider ${isDarkMode ? "dark__mode" : ""}`}
                  onClick={toggleTheme}
                ></div>
              </button>
            </div>
          </div>
          <h2>
            {weather.city}, {weather.country}
          </h2>
          <section className="dates__general__container">
            <div
              className={`principal__dates__general__container ${
                isDarkMode ? "dark__mode" : ""
              }`}
            >
              <h3>{weather.weather.description}</h3>
              <div className="principal__dates_first__container">
                <p>
                  {isCelsius
                    ? weather.temperature.celsius.toFixed(2)
                    : weather.temperature.farenheit.toFixed(2)}
                  °{isCelsius ? "C" : "F"}
                </p>
                <div className="principal__dates__first__container__img">
                  <img src={weather.weather.icon} alt="Imagen del clima" />
                </div>
              </div>
              <div className="principal__dates__second__container">
                <div>
                  <p>
                    Min:{" "}
                    {isCelsius
                      ? `${weather.min_temp.celsius.toFixed(2)} °C`
                      : `${weather.min_temp.farenheit.toFixed(2)} °F`}
                  </p>
                  <p>
                    Max:{" "}
                    {isCelsius
                      ? `${weather.max_temp.celsius.toFixed(2)} °C`
                      : `${weather.max_temp.farenheit.toFixed(2)} °F`}
                  </p>
                </div>
                <div>
                  Real feel:{" "}
                  {isCelsius
                    ? `${weather.feels_like.celsius.toFixed(2)} °C`
                    : `${weather.feels_like.farenheit.toFixed(2)} °F`}
                </div>
              </div>
            </div>
            <div
              className={`secondary__dates__general__container ${
                isDarkMode ? "dark__mode" : ""
              }`}
            >
              <ul className=" secondary__items__dates__container">
                <li>
                  {" "}
                  <i className="bx bx-droplet"></i> Humidity: {weather.humidity}
                  %{" "}
                </li>
                <li>
                  {" "}
                  <i className="bx bx-bar-chart"></i> Pressure:{" "}
                  {weather.pressure} hPa
                </li>
                <li>
                  {" "}
                  <i className="bx bx-wind"></i> Wind Speed:{" "}
                  {weather.wind.speed} km/h
                </li>
                <li>
                  {" "}
                  <FontAwesomeIcon icon={faEye} /> Visibility:{" "}
                  {weather.visibility} km
                </li>
              </ul>
            </div>
          </section>
          <div className="change__degrees__general__container">
            <button
              onClick={() => setIsCelsius(!isCelsius)}
              className={isDarkMode ? "dark__mode" : ""}
            >
              Change °{isCelsius ? "F" : "C"}
            </button>
          </div>
        </div>
      ) : (
        <p>Loading Page</p>
      )}
    </>
  );
};

export default WeatherCard;
