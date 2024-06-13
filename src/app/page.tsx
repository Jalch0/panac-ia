'use client'
import Welcoming from "@/components/Welcoming";
import SoftwareApps from "@/components/SoftwareApps";
import Image from "next/image";
import ChatBot from '@/components/images/chatbot.svg';
import MapsPANACIA_IA from '@/components/images/mapsPANAC-IA.svg';
import DoctorPANAC_IA from '@/components/images/doctorPANAC-IA.svg';
import PharmacyPANAC_IA from '@/components/images/pharmaciPANAC-IA.svg';
import Footer from "@/components/Footer";

/**
 * Componente y página de bienvenida del sitio
 * @returns <HomePage />
 */
const HomePage: React.FC = () => {
    return(
        <div className="flex flex-col items-center">
            <Welcoming />
            <div className="w-3/4 flex flex-col">
                <h2 className="py-20 lg:text-5xl sm:text-4xl ph:text-4xl font-semibold text-center text-primary">Powered by</h2>
                <SoftwareApps />
                <hr className="h-px my-16 bg-gray-200 border-0 dark:bg-gray-300" />
                <div>
                    <h2 className="py-5 lg:text-5xl sm:text-4xl ph:text-4xl font-semibold text-center text-secondary">¡Aprovecha las ventajas de PANAC-IA!</h2>
                    <div>
                        <h3 className="py-10 lg:text-4xl sm:text-3xl ph:text-3xl font-semibold text-center text-primary">Asistente médico virtual</h3>
                        <div className="mb-20 lg:px-32 md:px-10 flex lg:flex-row-reverse ph:flex-col gap-5 justify-center items-center">
                            <p className="text-gray-600 md:text-lg ph:text-base lg:text-start ph:text-center lg:leading-10 ph:leading-7">
                                Trata algunas dolencias comunes de forma fácil y sin salir de casa. Nuestro <span className="text-secondary">asistente médico virtual</span> te aconsejará
                                sobre medicamentos, rutinas de ejercicios, tratamientos y productos alimenticios que te ayudarán a mejorar tu salud.
                            </p>
                            <Image src={ChatBot} alt='chatbotImage' className='md:w-96 md:h-96 ph:w-64 ph:h-64'/>
                        </div>
                        <div className="mb-20 lg:px-32 md:px-10 flex lg:flex-row ph:flex-col gap-5 justify-center items-center">
                            <p className="text-gray-600 md:text-lg ph:text-base lg:text-start ph:text-center lg:leading-10 ph:leading-7">
                            Escribe tu dolencia y te recomendaremos al <span className="text-primary-focus">mejor profesional</span> basado en tus síntomas para que seas tratado adecuadamente.
                            </p>
                            <Image src={DoctorPANAC_IA} alt='chatbotImage' className='md:w-96 md:h-96 ph:w-64 ph:h-64'/>
                        </div>
                    </div>
                    <hr className="h-px my-5 mx-auto w-2/3 bg-gray-200 border-0 dark:bg-gray-300" />
                    <div>
                        <h3 className="py-10 lg:text-4xl sm:text-3xl ph:text-3xl font-semibold text-center text-secondary">Encuentra hospitales y farmacias a tu alcance</h3>
                        <div className="mb-20 lg:px-32 md:px-10 flex lg:flex-row-reverse ph:flex-col gap-5 justify-center items-center">
                            <p className="text-gray-600 md:text-lg ph:text-base lg:text-start ph:text-center lg:leading-10 ph:leading-7">
                                <span className="text-secondary">Localiza los centros de salud</span> más cercanos según tus necesidades y las farmacias a tu alrededor gracias a nuestra herramienta
                                 de búsqueda.
                            </p>
                            <Image src={MapsPANACIA_IA} alt='chatbotImage' className='md:w-96 md:h-96 ph:w-64 ph:h-64'/>
                        </div>
                        <div className="mb-20 lg:px-32 md:px-10 flex lg:flex-row ph:flex-col gap-5 justify-center items-center">
                            <p className="text-gray-600 md:text-lg ph:text-base lg:text-start ph:text-center lg:leading-10 ph:leading-7">
                                <span className="text-primary-focus">Conoce los detalles</span> de las diferentes instituciones de atención médica que desees visitar para ser tratado.
                            </p>
                            <Image src={PharmacyPANAC_IA} alt='chatbotImage' className='md:w-96 md:h-96 ph:w-64 ph:h-64'/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage;