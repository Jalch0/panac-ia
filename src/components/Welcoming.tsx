"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

/**
 * Componente que muestra una sección de bienvenida al usuario
 * @returns <Welcoming />
 */
const Welcoming: React.FC = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const header = document.querySelector("header");
    if (header) {
      const height = header.clientHeight;
      setHeaderHeight(height);
      setIsLoading(false);
    }
  }, []);
  return (
    <> 
      { isLoading ? (<Loader2 className='mt-20 w-10 h-10 animate-spin text-primary' />) :
        (
          <div className={`min-h-[calc(93vh)] w-full bg-gray-200/50 sm:rounded-[50%/20%] sm:rounded-t-none ph:rounded-[40%/10%] ph:rounded-t-none flex justify-center items-center`}>
            <div className="md:px-36 ph:px-10 flex flex-col text-center items-center">
              <h1 className="font-semibold lg:text-6xl sm:text-5xl ph:text-4xl text-balance leading-[1.10] text-primary">
                Potencia tu bienestar con PANAC-IA:
              </h1>
              <div className="lg:mb-14 ph:mb-10">
                <h1 className="font-semibold lg:text-5xl sm:text-4xl ph:text-2xl text-secondary">Tu asistente personalizado en salud.</h1>
              </div>
              <div className="lg:mb-14 ph:mb-10">
                <h1 className="font-normal lg:text-2xl md:text-xl ph:text-lg text-primary">Accede a instalaciones médicas cercanas y recibe orientación personalizada para tu bienestar, todo al alcance de tus manos, sin necesidad de conocimientos técnicos.</h1>
              </div>
              { !session?.user ?
                <div className="flex md:flex-row md:gap-8 ph:gap-5 ph:flex-col">
                  <Link href='/login'>
                    <button className="bg-primary hover:bg-primary-hover transition-colors text-white py-2 px-4 rounded md:w-44 ph:w-52 flex justify-center items-center gap-3"><CiLogin />Iniciar Sesión</button>
                  </Link>
                  <Link href='/register'>
                    <button className="bg-secondary hover:bg-secondary-hover transition-colors text-white py-2 px-4 rounded md:w-44 ph:w-52 flex justify-center items-center gap-3"><FaUserPlus />Registrarse</button>
                  </Link>
                </div>
                :
                <Link href='/dashboard'>
                  <button className="bg-secondary hover:bg-secondary-hover transition-colors text-white py-2 px-4 rounded md:w-56 ph:w-52 flex justify-center items-center gap-1 text-lg">¡Empecemos!</button>
                </Link>
              }
            </div>
          </div>
        )
      }
    </>
  );
};

export default Welcoming;
