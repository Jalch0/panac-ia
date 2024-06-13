import Image from "next/image";
import Link from "next/link";
import React from "react";
import GoogleIcon from "@/components/Icons/Google_Maps_icon_(2020).svg"
import OPENAI_Icon from "@/components/Icons/ChatGPT_logo.svg"
import VercelIcon from "@/components/Icons/vercelLogo.png"
import { FaArrowRightLong } from "react-icons/fa6";

/**
 * Componente que genera la lista de las tecnologías con las que está trabajando PANAC-IA
 * @returns <SoftwareApps />
 */
const SoftwareApps: React.FC = () => {
    return(
        <div className="md:grid lg:grid-cols-3 md:grid-cols-2 ph:flex ph:flex-col gap-5 lg:px-32">
            <Link href="https://developers.google.com/maps" target="_blank">
                <div className="flex p-5 bg-gray-100 hover:bg-[#ececec] transition-all h-24 rounded-lg outline outline-offset-2 outline-1 outline-gray-300 hover:shadow-lg">
                    <div className="w-14 h-14 outline outline-1 outline-gray-300 bg-white rounded-lg flex justify-center items-center">
                        <Image src={GoogleIcon} alt="googleMaps-logo" className="w-10 h-10" />
                    </div>
                    <div className="col-span-2 flex flex-col justify-center pl-3">
                        <p className="text-gray-600">Google Maps API</p>
                        <p className="flex items-center gap-3 text-primary hover:text-primary-hover">Leer más <FaArrowRightLong /></p>
                    </div>
                </div>
            </Link>
            <Link href="https://openai.com/api" target="_blank">
                <div className="flex p-5 bg-gray-100 hover:bg-[#ececec] transition-all h-24 rounded-lg outline outline-offset-2 outline-1 outline-gray-300 hover:shadow-lg">
                    <div className="w-14 h-14 outline outline-1 outline-gray-300 bg-white rounded-lg flex justify-center items-center">
                        <Image src={OPENAI_Icon} alt="copilot-logo" className="w-10 h-10"/>
                    </div>
                    <div className="col-span-2 flex flex-col justify-center pl-3">
                        <p className="text-gray-600">OpenAI API</p>
                        <p className="flex items-center gap-3 text-primary hover:text-primary-hover">Leer más <FaArrowRightLong /></p>
                    </div>
                </div>
            </Link>
            <Link href="https://vercel.com/" target="_blank">
                <div className="flex p-5 bg-gray-100 hover:bg-[#ececec] transition-all h-24 rounded-lg outline outline-offset-2 outline-1 outline-gray-300 hover:shadow-lg">
                    <div className="w-14 h-14 outline outline-1 outline-gray-300 bg-white rounded-lg flex justify-center items-center">
                        <Image src={VercelIcon} alt="copilot-logo" className="w-10 h-10"/>
                    </div>
                    <div className="col-span-2 flex flex-col justify-center pl-3">
                        <p className="text-gray-600">Vercel</p>
                        <p className="flex items-center gap-3 text-primary hover:text-primary-hover">Leer más <FaArrowRightLong /></p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default SoftwareApps;