import { kelvinToCelcius } from "./kelvinToCelsius";

export const kelvinToFarenheit = (kelvinDegrades) => {
  const celsius = kelvinToCelcius(kelvinDegrades);
  const FARENHEIT_CONVERSION = 9 / 5;
  const FARENHEIT_INITIAL_CONSTANT = 32;
  return celsius * FARENHEIT_CONVERSION + FARENHEIT_INITIAL_CONSTANT;
};
