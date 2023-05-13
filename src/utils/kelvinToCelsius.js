//Magic numbers (273.15 , de donde salio?)
const FACTOR_CONVERSION = 273.15;
export const kelvinToCelcius = (kelvinDegrades) =>
  kelvinDegrades - FACTOR_CONVERSION;
