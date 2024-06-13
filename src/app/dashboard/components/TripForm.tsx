import React, { useEffect, useState } from 'react'
import SearchPlaces from './SearchPlaces';

/**
 * Componente que valida la renderización de los lugares cercanos si ya ha cargado la consulta a la API
 * @returns true: <SearchPlaces />
 * @returns false: <></>
 */
function TripForm() {

  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.defer = true;

    script.onload = () => {
      setScriptLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return scriptLoaded ? (

      <SearchPlaces />

  ) : <></>
}

export default TripForm