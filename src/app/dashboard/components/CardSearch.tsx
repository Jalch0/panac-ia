import Image from 'next/image'
import React from 'react'
import star from "../../../../public/Images/star.png"
import { FaRegHospital } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { MdOutlineNoPhotography } from "react-icons/md";
import { MdLocalHospital } from "react-icons/md";
import { FaTooth } from "react-icons/fa";

interface PropsCard {
    title: string,
    Icon: string,
    Open?: boolean,
    rating?: number,
    vicinity: string,
    photo?: string,
}


/**
 * Componente que permite crear tarjetas de los lugares de interés cercanos
 * @param {title, Icon, Open, rating, vicinity, photo}
 * @returns <CardSearch />
 */
const CardSearch: React.FC<PropsCard> = ({title, Icon, Open, rating, vicinity, photo}) => {

  return (
    <div className="w-full border-solid border-2 flex lg:flex-row ph:flex-col lg:min-h-56 lg:max-h-64 lg:mb-5 ph:mb-8 rounded-lg bg-white shadow-md">
      <div className="lg:w-3/5 ph:w-100">
        {photo ? (
          <Image
            src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo}&sensor=false&maxheight=400&maxwidth=400&key=${process.env.GOOGLE_MAPS_API_KEY}`}
            alt="logo"
            width={285}
            height={150}
            className="lg:rounded-l-lg lg:rounded-r-none ph:w-full ph:rounded-t-lg lg:h-full ph:h-56 object-cover"
          />
        ) : (
          <div className="flex items-center justify-center ph:h-56 text-3xl py-20 bg-gray-200 lg:h-full">
            <MdOutlineNoPhotography />
          </div>
        )}
      </div>
      <div className="w-full p-5 text-gray-600">
        {/* Título */}
        <div className="md:text-2xl ph:text-xl font-semibold mb-2">
          <h2>{title}</h2>
        </div>
        {/* Icono */}
        <div>
          <div className="flex items-center gap-1">
            <span>
              {Icon === "pharmacy" ? (
                <MdLocalHospital />
              ) : Icon === "hospital" ? (
                <FaRegHospital />
              ) : (
                <FaTooth />
              )}
            </span>
            {Icon === "pharmacy" ? (
              <span>Farmacia</span>
            ) : Icon === "hospital" ? (
              <span>Hospital</span>
            ) : (
              <span>Dentista</span>
            )}
          </div>
        </div>
        {/* Hora de apertura */}
        <div>
          <div className="flex items-center gap-1">

            <span>
              <FaClock />
            </span>
            {Open === undefined ? <span>No disponible</span> : (Open ? <span className='text-green-400'>Abierto</span> : <span className='text-red-400'>Cerrado</span>)}

          </div>
        </div>
        {/* Valoración */}
        <div>
          <div className="flex items-center gap-1">
            <span>Valoracion</span>

            {rating ?
              Array.from({ length: Math.floor(rating) }, (_, index) => (
                <Image
                  key={index}
                  src={star}
                  alt="star"
                  width={12}
                  height={12}
                />
              )) : <span className='text-sm text-gray-200 ml-2'>(Sin Valoraciones)</span>}

          </div>
        </div>
        {/* Localización */}
        <div>
          <div>{vicinity}</div>
        </div>
      </div>
    </div>
  );
}

export default CardSearch