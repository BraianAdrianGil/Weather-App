import axios from "axios";
import { kelvinToCelcius } from "../utils/kelvinToCelsius";
import { kelvinToFarenheit } from "../utils/kelvinToFarenheit";
import { getIconById } from "../utils/getIconById";
import { mToKm } from "../utils/mToKm";

export const getCurrentWeatherByCity = async (city) => {
  try {
    const params = {
      q: city,
      appid: "283f32beb215c0db85bfd23784a36be3",
    };

    const res = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      { params: params }
    );
    console.log(res.data);
    const weatherInfo = {
      country: res.data.sys.country,
      city: res.data.name,
      humidity: res.data.main.humidity,
      pressure: res.data.main.pressure,
      visibility: mToKm(res.data.visibility),
      weather: {
        main: res.data.weather[0].main,
        description: res.data.weather[0].description,
        icon: getIconById(res.data.weather[0].icon),
      },
      temperature: {
        kelvin: res.data.main.temp,
        celsius: kelvinToCelcius(res.data.main.temp),
        farenheit: kelvinToFarenheit(res.data.main.temp),
        max: res.data.main.temp_max,
        min: res.data.main.temp_min,
      },
      min_temp: {
        celsius: kelvinToCelcius(res.data.main.temp_min),
        farenheit: kelvinToFarenheit(res.data.main.temp_min),
      },
      max_temp: {
        celsius: kelvinToCelcius(res.data.main.temp_max),
        farenheit: kelvinToFarenheit(res.data.main.temp_max),
      },
      feels_like: {
        celsius: kelvinToCelcius(res.data.main.feels_like),
        farenheit: kelvinToFarenheit(res.data.main.feels_like),
      },
      wind: {
        gust: res.data.wind.gust,
        speed: res.data.wind.speed,
      },
    };

    // Retornar los datos del clima
    return weatherInfo;
  } catch (error) {
    // Manejar el error
    console.error("Error al obtener el clima actual:", error);
    throw error;
  }
};
