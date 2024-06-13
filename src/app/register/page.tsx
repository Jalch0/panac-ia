'use client'

import Input from "@/components/Input";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import Image from 'next/image';
import Background from '@/components/images/background-nocolor.svg';
import axios, {AxiosError} from "axios";
import validateForm from "./validateForm";
import { signIn, useSession } from 'next-auth/react'
import { redirect, useRouter } from "next/navigation";
import BannerFormError from "@/components/BannerFormError";
import { Loader2 } from "lucide-react";

function RegisterPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [error, setError] = useState<string>("");
  const [errorsForm, setErrorsForm] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitLoading, setIsSumbitLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if(session?.user){
      redirect('/dashboard')
    }
    setIsLoading(false)
  }, [session, router])

  /**
   * Función que crea un usuario y lo carga en la BBDD
   * @param e 
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validar el formulario
    const formErrors = validateForm(formData);
    setErrorsForm(formErrors);
    
    if (Object.keys(formErrors).length !== 0) {
      return;
    }

    try {
      setIsSumbitLoading(true)
      const signUpResponse = await axios.post('/api/auth/register', {
        email: formData.email,
        name: formData.name,
        lastName: formData.lastName,
        password: formData.password,
      })
      setError("");

      const res = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })
      
      if(res?.ok) return router.push("/dashboard");
      setIsSumbitLoading(false);

    } catch (error) {
      if(error instanceof AxiosError){
        setError(error.response?.data.message)
      }
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
    }));
  };

  return (
    <>
      {!isLoading &&
        <div className={`min-h-[calc(93vh)] flex justify-start items-center bg-gradient-to-r from-secondary to-secondary-hover`}>
          <Image src={Background} alt='background' layout='fill' objectFit='cover' quality={100} className='absolute inset-0 z-0 opacity-40'/>
          <div className="bg-gray-100 pt-5 lg:w-1/2 sm:w-full ph:w-full min-h-[calc(93vh)] flex flex-col justify-center items-center text-center lg:rounded-r-3xl z-10">
            <h1 className="ph:text-2xl md:text-3xl font-semibold text-balance text-secondary">¡Regístrate gratis y comienza a cuidar de tu salud en minutos!</h1>
            <p className="text-xs pt-5 text-gray-600">No requiere tarjeta de crédito.</p>
            <form className="w-3/4 flex flex-col" onSubmit={handleSubmit}>
              {error && 
                <BannerFormError error={error} color="green" />
              }
              <Input label="Nombre" type="text" name="name" value={formData.name} onChange={handleChange} errorMessage={errorsForm.name}/>
              <Input label="Apellidos" type="text" name="lastName" value={formData.lastName} onChange={handleChange} errorMessage={errorsForm.lastName}/>
              <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} errorMessage={errorsForm.email}/>
              <Input label="Contraseña" type="password" name="password" value={formData.password} onChange={handleChange} errorMessage={errorsForm.password}/>
              <Input label="Confirmar contraseña" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} errorMessage={errorsForm.confirmPassword}/>
              <button type="submit" className="w-full h-10 mt-10 mb-4 bg-secondary hover:bg-secondary-hover transition-colors text-white py-2 px-4 rounded flex justify-center items-center">{isSubmitLoading ? <Loader2 className='w-4 h-4 animate-spin text-white' /> : 'Registrarse'}</button>
            </form>
            <p className="text-gray-600 text-sm pb-5">¿Ya estás registrado? <span className="text-secondary hover:text-secondary-hover"><Link href='/login'>Inicia sesión</Link></span></p>
          </div>
        </div>
      }
    </>
  );
}

export default RegisterPage;
