// Promisificar (cuando algo no es una promesa , y la volvemos una promesa).

export const getCoordinates = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      // Cuando se ejecuta resolve, la promesa se resuelve con el valor pasado a resolve
      // Cuando se ejecuta reject, la promesa se rechaza con el valor pasado a reject
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    //   navigator.geolocation.getCurrentPosition(
    //     (position) => console.log(position),
    //     () => console.error("No hay permisos")
    //   );

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (_) {
    return null;
  }
};
