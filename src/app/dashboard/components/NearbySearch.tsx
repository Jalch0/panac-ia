
import { useState, useEffect } from 'react';
import CardSearch from './CardSearch';
import axios from 'axios';


/**
 * Componente que permite renderizar la lista de lugares obtenidos
 * @returns Lista de <CardSearch />
 */
const IndexPage = () => {
  const [hospitales, setHospitales] = useState([]);

  useEffect(() => {
    const obtenerHospitalesCercanos = async () => {
      try {
        // Paso 1: Obtener tu ubicación actual
        const ubicacionActual = await obtenerUbicacionActual();

        // Paso 2: Realizar una solicitud a la API de Google Maps Places
        // @ts-ignore
        const hospitalesCercanos = await obtenerHospitalesCercanosAPI(ubicacionActual);

        // Paso 3: Mostrar los resultados
        setHospitales(hospitalesCercanos.slice(0, 5)); // Mostrar solo los 5 primeros hospitales
      } catch (error) {
        console.error('Error al obtener los hospitales cercanos:', error);
      }
    };

    obtenerHospitalesCercanos();
  }, []);

  /**
   * Función que permite obtener la ubicación actual del usuario
   * @returns Promise
   */
  const obtenerUbicacionActual = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitud: position.coords.latitude,
            longitud: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  /**
   * Función que obtiene los hospitales o lugares de interés cercanos
   * @param {latitud, longitud}
   * @returns Object[]
   */
        // @ts-ignore

        const obtenerHospitalesCercanosAPI = async ({ latitud, longitud }) => {
          const response = await fetch(`/api/nearbyplaces?latitud=${latitud}&longitud=${longitud}`);
          const data = await response.json();
          console.log(data)
          return data;
        };

  return (
    <div>
        {hospitales.map((hospital, index) => (
        // @ts-ignore
          <CardSearch key={hospital.nombre} title={hospital.nombre} Icon={"hospital"} Open={hospital.open} rating={hospital.rating} vicinity={hospital.direccion} geometry={hospital.geometry}/>
        ))}
    </div>
  );
};

export default IndexPage;