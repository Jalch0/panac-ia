'use client'
import React, { useEffect, useState } from 'react'
import { GoogleMap, MarkerF, MarkerClustererF, Circle, } from '@react-google-maps/api';

type Props = any

/**
 * Componente que renderiza el Mapa de Google Maps junto con los marcadores de los lugares de interés cercanos
 * @param {PropsLocation, userLocation, defaultValue, NearbyPlaces, selectLocation}
 * @returns Mapa renderizado de Google Maps con los marcadores de los lugares cercanos de interés
 */
const RequestPage: React.FC<Props> = ({PropsLocation, userLocation, defaultValue, NearbyPlaces, selectLocation}) => {

  const [containerStyle, setContainerStyle] = useState({width: '100%', height: '95vh'});

  /**
   * Función que permite cambiar el tamaño del mapa según la versión del dispositivo en que se use
   */
  const updateContainerStyle = () => {
    if (window.innerWidth <= 768) {
      setContainerStyle(prevState => ({ ...prevState, height: '80vh' }));
    } else {
      setContainerStyle(prevState => ({ ...prevState, height: '95vh' }));
    }
  };

  useEffect(() => {
    updateContainerStyle();
    window.addEventListener('resize', updateContainerStyle);
    return () => window.removeEventListener('resize', updateContainerStyle);
  }, []);

      //@ts-ignore
      const NearbyLocations = NearbyPlaces.map(marker => {
        return {lat: marker.geometry.lat,lng: marker.geometry.lng}
      })

      const locations = [PropsLocation]

      function createKey(location: any) {
        return location.lat + location.lng
      }

      const circleOptions = {
        center: userLocation,
        radius: 2500,
        options: {
          fillColor: '#1C6E8C',
          fillOpacity: 0.35,
          strokeColor: '#00BFB2',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          clickable: true,
          draggable: false,
          editable: false,
          visible: true,
          zIndex: 1
        }
      };


      const pinIcon = (opcion: string) => {
        let url = "/pin.png";
        if (opcion === "pharmacy") {
          url = "/pharmacy.png";
        } else if (opcion === "dentist") {
          url = "/dentist.png";
        }
        return {
          url: url,
          scaledSize: new window.google.maps.Size(35, 35),
        };
      };


      return  (
        userLocation.lat === null ? <h1>No se ha cargado el mapa </h1> :
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={15}
            center={PropsLocation.lat() !== 0 ? PropsLocation : selectLocation.lat() === 0 ? userLocation : selectLocation}
          >
            <Circle {...circleOptions} />
            <MarkerF position={userLocation}/>
            { PropsLocation.lat() !== 0 ? 
              <MarkerF
              position={PropsLocation}
              icon={pinIcon(defaultValue)}
              />
            : selectLocation.lat() !== 0 ? 
              <MarkerF
              position={selectLocation}
              icon={pinIcon(defaultValue)}
              />
            : <MarkerClustererF>
              {(clusterer) => (
                <>
                {locations.length > 0 && 
                  NearbyLocations.map((location: any) => (
                    <MarkerF 
                      key={createKey(location)} 
                      position={location} 
                      clusterer={clusterer} 
                      icon={pinIcon(defaultValue)} 
                    />
              ))}
              </>
              )}
            </MarkerClustererF>}
          </GoogleMap>
      ) 
}

export default RequestPage