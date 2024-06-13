'use client'

import Input from '@/components/Input'
import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import Logo from '@/components/images/logoAppBlue.svg';
import Image from 'next/image';
import Background from '@/components/images/background-nocolor.svg';
import { signIn } from 'next-auth/react';
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import BannerFormError from '@/components/BannerFormError';
import { Loader2 } from 'lucide-react';

/**
 * Componente y página que representa a la pantalla del formulario de inicio de sesión
 * @returns Página del formulario de Login
 */
function LoginPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitLoading, setIsSumbitLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

  useEffect(() => {
      if(session?.user){
        redirect('/dashboard')
      }
      setIsLoading(false);
  }, [session, router])
  
    /**
     * Función que valida los datos del usuario para iniciar sesión o no en el sitio web de PANAC-IA
     * @param e 
     * @returns 
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      try {
        setIsSumbitLoading(true);
        const res = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        })

        if(res?.error) setError(res.error as string);
        
        if(res?.ok) return router.push("/dashboard");
        setIsSumbitLoading(false);
      } catch (error) {
        setIsSumbitLoading(false);
      }
    }
  
    /**
     * Función que maneja el cambio de estados del formulario
     * @param e 
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
    return(
      <>
      {!isLoading &&
        <div className={`min-h-[calc(93vh)] flex justify-start items-center bg-gradient-to-r from-primary to-primary-hover`}>
          <Image src={Background} alt='background' layout='fill' objectFit='cover' quality={100} className='absolute inset-0 z-0 opacity-40'/>
          <div className="bg-gray-100 lg:w-1/2 sm:w-full ph:w-full min-h-[calc(93vh)] flex flex-col justify-center items-center text-center lg:rounded-r-3xl gap-16 z-10">
              <Link href="/">
                  <Image alt="logo" src={Logo} width={100} height={100} />
              </Link>
              <form onSubmit={handleSubmit} className="w-3/4 flex flex-col">
                <h1 className='text-3xl font-semibold text-balance text-primary'>Inicia sesión</h1>
                {error && 
                    <BannerFormError error={error} color='blue' />
                }
                <Input label='Email' type='text' name='email' value={formData.email} onChange={handleChange}/>
                <Input label='Contraseña' type='password' name='password' value={formData.password} onChange={handleChange}/>
                <button type='submit' className="w-full mt-8 h-10 bg-primary hover:bg-primary-hover transition-colors text-white py-2 px-4 rounded flex justify-center items-center">{isSubmitLoading ? <Loader2 className='w-4 h-4 animate-spin text-white' /> : 'Inicia sesión'}</button>
              </form>
              <p className="text-gray-600 text-sm">¿Aún no tienes cuenta? <span className="text-primary hover:text-primary-hover"><Link href='/register'>Regístrate</Link></span></p>
          </div>
        </div>
      }
      </>
    )
}

export default LoginPage