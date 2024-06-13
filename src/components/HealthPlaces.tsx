import Link from "next/link";
import React from "react";
import { FaHospital } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import { AiFillMedicineBox } from "react-icons/ai";

interface StateProps {
    setLocation: (location: string) => void;
}

/**
 * Componente que contiene los 3 tipos de lugares que pueden ser filtrados en el Mapa y en las tarjetas de sitios de interés
 * @param {setLocation} 
 * @returns <HealthPlaces />
 */
const HealthPlaces: React.FC<StateProps> = ({setLocation}) => {

    return(
        <div className="md:grid lg:grid-cols-3 md:grid-cols-2 ph:flex ph:flex-col gap-5">
                <div className="flex items-center p-5 bg-gray-50 hover:bg-gray-200 h-16 rounded-lg outline outline-offset-0 outline-1 outline-gray-200 hover:shadow-lg hover:shadow-gray-600 hover:cursor-pointer transition-all" onClick={() => setLocation("hospital")}>
                    <div className="w-10 h-10 outline outline-1 outline-gray-300 bg-white rounded-lg flex justify-center items-center">
                        <FaHospital className="font-bold text-3xl text-secondary" />
                    </div>
                    <div className="col-span-2 flex flex-col justify-center pl-3">
                        <p className="text-gray-600">Hospitales</p>
                    </div>
                </div>

                <div className="flex items-center p-5 bg-gray-50 hover:bg-gray-200 h-16 rounded-lg outline outline-offset-0 outline-1 outline-gray-200 hover:shadow-lg hover:shadow-gray-600 hover:cursor-pointer transition-all" onClick={() => setLocation("dentist")}>
                    <div className="w-10 h-10 outline outline-1 outline-gray-300 bg-white rounded-lg flex justify-center items-center">
                        <FaHospitalUser className="font-bold text-3xl text-secondary" />
                    </div>
                    <div className="col-span-2 flex flex-col justify-center pl-3">
                        <p className="text-gray-600">Dentistas</p>
                    </div>
                </div>

                <div className="flex items-center p-5 bg-gray-50 hover:bg-gray-200 h-16 rounded-lg outline outline-offset-0 outline-1 outline-gray-200 hover:shadow-lg hover:shadow-gray-600 hover:cursor-pointer transition-all" onClick={() => setLocation("pharmacy")}>
                    <div className="w-10 h-10 outline outline-1 outline-gray-300 bg-white rounded-lg flex justify-center items-center">
                        <AiFillMedicineBox className="font-bold text-3xl text-secondary" />
                    </div>
                    <div className="col-span-2 flex flex-col justify-center pl-3">
                        <p className="text-gray-600">Farmacias</p>
                    </div>
                </div>

        </div>
    )
}

export default HealthPlaces;