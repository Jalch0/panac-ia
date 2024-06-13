"use client"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import useOnclickOutside from "react-cool-onclickoutside";
import { useEffect, useRef, useState } from "react";
import  Map  from "@/app/dashboard/components/Showmap"
import HealthPlaces from "@/components/HealthPlaces";
import CardSearch from "./CardSearch";
import Footer from "@/components/Footer";


interface typeHospital {
  nombre: string,
  direccion: string,
  rating: number,
  open: boolean,
  photo: string,
  geometry: {
    lat: number,
    lng: number
  }
}

interface selectLocation {
  lat: number,
  lng: number
}

/**
 * Componente que renderiza el listado de lugares y el mapa de Google Maps
 * @returns Lista de tarjetas de los lugares cercanos y Mapa de Google Maps con la ubicación del usuario
 */
export default function SearchPlaces() {

    const [actualLocation, setActualLocation] = useState(new google.maps.LatLng(0,0));
    const [NearbyPlaces, setNearbyPlaces] = useState<typeHospital[]>([]);
    const [locationToSearch, setLocationToSearch] = useState("hospital");
    const [userLocation, setUserLocation] = useState(new google.maps.LatLng(0,0));
    const [selectLocation, setSelectLocation] = useState(new google.maps.LatLng(0,0));

    const mapRef = useRef(null);

    const scrollToMap = () => {
      //@ts-ignore
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        
        const getUserLocation = async () => {
          if (navigator.geolocation) {
            try {
              const position = await navigator.geolocation.getCurrentPosition(
                (pos) => {
                  setUserLocation(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                }
              );
            } catch (error) {
              console.error("Error getting user location:", error);
            }
          } else {
            console.error("Geolocation is not supported by this browser");
          }
        };
    
        getUserLocation();
      }, [setUserLocation]);

    useEffect(() => {
        const getNearbyPlaces = async () => {
          try {
            // @ts-ignore
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${userLocation.lat()},${userLocation.lng()}&radius=2500&type=${locationToSearch}&key=${process.env.GOOGLE_MAPS_API_KEY}`
              );
          
              const data = await response.json();


              if (data.status === 'OK') {
                  // @ts-ignore
                  const results = data.results.map((hospital) => ({
                  nombre: hospital.name,
                  direccion: hospital.vicinity,
                  rating: hospital.rating,
                  open: hospital.opening_hours?.open_now,
                  photo: hospital.photos?.[0].photo_reference,
                  geometry: hospital.geometry.location
                }));
                setNearbyPlaces(results.slice(0, 10));
                setSelectLocation(new google.maps.LatLng(0,0))
              } 
  
          } catch (error) {
            console.error('Error al obtener los hospitales cercanos:', error);
          }
        };
        getNearbyPlaces();
      }, [locationToSearch, userLocation]);


    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        types: ["hospital"],
        location: userLocation,
        radius: 5000,
      },
      debounce: 300,
    });
    const ref = useOnclickOutside(() => {
      clearSuggestions();
    });
  
    // @ts-ignore
    const handleInput = (e) => {
      setValue(e.target.value);
    };
  
    const handleSelect =
    // @ts-ignore
      ({ description }) =>
      () => {
        setValue(description, false);
        clearSuggestions();

  
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          setActualLocation(new google.maps.LatLng(lat, lng));
          console.log(`📍 Coordinates: ", ${actualLocation?.lat}, ${actualLocation?.lng}`);
        });
      };

    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li key={place_id} onClick={handleSelect(suggestion)} className="border-b border-gray-200 py-2 px-5 cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out">
            <span>{main_text}</span> <span>{secondary_text}</span>
          </li>
        );
      });

      const handleLocation = (props: selectLocation) => {
        setSelectLocation(new google.maps.LatLng(props.lat, props.lng))
        setActualLocation(new google.maps.LatLng(0,0))
      }

    return (
      <div className="w-full" ref={ref}>
        <div
          className={`min-h-[calc(93vh)] w-full sm:rounded-[50%/20%] sm:rounded-t-none ph:rounded-[40%/10%] ph:rounded-t-none bg-gradient-to-r from-primary to-primary-hover flex justify-center items-center`}
        >
          <div className="ph:px-10 flex flex-col text-center items-center lg:px-72">
            <h1 className="font-semibold lg:text-5xl sm:text-4xl ph:text-3xl md:text-balance ph:text-pretty text-gray-100">
              Encuentra el lugar perfecto según tus necesidades
            </h1>

            <div className="py-10 w-full relative">
              <input
                className={`rounded-lg px-5 py-2 bg-white text-gray-600 border outline outline-offset-1 outline-1 outline-primary hover:outline-primary-hover focus:outline-primary-focus w-full`}
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Buscar un lugar dentro de tu sistema de salud..."
              />

              {status === "OK" && <ul className="mt-2 absolute w-full bg-white rounded-md py-2 items-start">{renderSuggestions()}</ul>}
            </div>

            <HealthPlaces setLocation={setLocationToSearch} />
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-5 ph:gap-5 ph:flex ph:flex-col-reverse py-10 lg:px-24 ph:px-5 md:px-36">
          <div className="">
            {NearbyPlaces.map((value) => (
              <div
                key={value.nombre}
                onClick={() => {handleLocation(value.geometry); scrollToMap()}}
                className="cursor-pointer hover:brightness-90 transition-all"
              >
                <CardSearch
                  key={value.nombre}
                  title={value.nombre}
                  vicinity={value.direccion}
                  photo={value.photo}
                  Icon={locationToSearch}
                  rating={value.rating}
                  Open={value.open}
                />
              </div>
            ))}
          </div>

          <div>
          <div className="sticky top-0" ref={mapRef}>
            <Map
                PropsLocation={actualLocation}
                userLocation={userLocation}
                defaultValue={locationToSearch}
                location={location}
                NearbyPlaces={NearbyPlaces}
                selectLocation={selectLocation}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };