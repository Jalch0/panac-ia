'use client'
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import LogoImage from "@/components/Icons/logo.svg";
import { useSession, signOut } from 'next-auth/react';
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { FaUserPlus } from "react-icons/fa";

/**
 * Componente que renderiza el Header del sitio web de PANAC-IA
 * @returns <Navbar />
 */
const Navbar: React.FC = () => {
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const { data: session } = useSession();

  return (
    <>
      <header className="min-h-[7vh] shadow-md relative z-50">
        <nav className="mx-auto min-h-[7vh] flex items-center justify-between lg:py-2 lg:px-40 sm:px-20 sm:py-2 ph:px-10 ph:py-2 bg-gray-100">
          <Link href={!session ? '/' : '/dashboard'}>
            <div className="flex items-center gap-2">
              <Image alt="logo" src={LogoImage} className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-primary">PANAC-IA</h1>
            </div>
          </Link>
          <button onClick={() => setOptionsVisible(!optionsVisible)}>
            <FaUserCircle className="w-8 h-8 text-primary hover:text-primary-hover transition-colors" />
          </button>
          {optionsVisible && (
            <ul className="absolute flex flex-col lg:right-[10%] ph:right-[10%] sm:top-14 ph:top-[4rem] bg-gray-100 shadow-lg text-gray-600 rounded-lg">
              {!session?.user ? 
                <>
                  <Link href="/login">
                    <li onClick={() => setOptionsVisible(false)} className="hover:bg-gray-200 font-medium transition-colors py-4 px-20 border-b-2 border-gray-200 rounded-t-lg flex items-center gap-2" >
                      <CiLogin />
                      Iniciar sesión
                    </li>
                  </Link>
                  <Link href="/register">
                    <li onClick={() => setOptionsVisible(false)} className="hover:bg-gray-200 font-medium transition-colors py-4 px-20 rounded-b-lg flex items-center gap-2">
                      <FaUserPlus />
                      Registrarse
                    </li>
                  </Link>               
                </>
                :
                <>
                  <Link href="/dashboard/profile">
                    <li onClick={() => setOptionsVisible(false)} className="hover:bg-gray-200 font-medium transition-colors py-4 px-20 border-b-2 border-gray-200 rounded-t-lg flex items-center gap-2" >
                      <FaRegUserCircle />
                      Mi perfil
                    </li>
                  </Link>  
                  <Link href='/'>
                    <li onClick={() => signOut()} className="hover:bg-gray-200 font-medium transition-colors py-4 px-20 rounded-b-lg flex items-center gap-2">
                      <CiLogout />
                      Cerrar sesión
                    </li>
                  </Link>
                </>
              }
            </ul>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
