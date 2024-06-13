'use client'
import React, { FormEvent, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Input from "@/components/Input";
import validatePassword from "./validatePassword";
import BannerAlert from "@/components/BannerAlert";
import axios, { AxiosError } from "axios";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


/**
 * Componente y página correspondiente al cambio de contraseña
 * @returns Renderiza la página de cambio de contraseña
 */
function ChangePasswordPage() {
    const { data: session, update } = useSession();
    const [bannerInfo, setBannerInfo] = useState({visible: false, title: '', message: '', color: ''})
    const [errorsForm, setErrorsForm] = useState<{[key: string]: string}>({});
    const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
    const [formData, setFormData] = useState({password: "", newPassword: "", email: session?.user?.email || null});
    const router = useRouter();

    /**
    * Función que actualiza los datos de un usuario
    * @param e 
    * @returns {Promise<void>}
    */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validar el formulario
    const formErrors = validatePassword(formData);
    setErrorsForm(formErrors);
    
    if (Object.keys(formErrors).length !== 0) {
      return;
    }

    try {
      setIsLoadingSubmit(true);
      const passwordResponse = await axios.post('/api/auth/updatePassword', {
        email: formData.email,
        password: formData.password,
        newPassword: formData.newPassword,
      });

      setBannerInfo({
        message: 'La contraseña ha sido modificada correctamente',
        title: '¡Bien hecho!',
        visible: true,
        color: 'green'
      })
      setFormData({email: session?.user?.email || null, password: '', newPassword: ''})
      setIsLoadingSubmit(false);

    }catch(error){
      if(error instanceof AxiosError){
        console.error(error)
        setBannerInfo({
            message: error.response?.data.message,
            title: '¡Error en el formulario!',
            visible: true,
            color: 'red'
        })
      }
      setIsLoadingSubmit(false);
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

    return(
        <>
          <div className="min-h-[calc(93vh)] w-full bg-gray-200/50 flex flex-col justify-center items-center">
              <h2 className="mt-8 mb-2 font-semibold lg:text-2xl sm:text-2xl ph:text-2xl text-balance text-primary">Cambiar contraseña</h2>
                <div className="mb-8 bg-white flex flex-col p-10 ph:w-full md:w-3/4 lg:w-2/5 rounded-2xl shadow-lg">
                  <div className="mt-[-1rem] ml-[-1.5rem] text-gray-600 text-lg">
                    <button onClick={() => {router.back()}} className="w-28 h-6 hover:bg-gray-200 rounded-full transition-all flex items-center justify-center">
                      <IoArrowBack /> <span className="text-base font-normal">Regresar</span>
                    </button>
                  </div>
                  {bannerInfo.visible &&
                    <BannerAlert color={bannerInfo.color == 'green' ? 'green' : 'red'} title={bannerInfo.title} message={bannerInfo.message} onClose={() => setBannerInfo({visible: false, message: '', title: '', color: ''})}/>
                  }
                  <form onSubmit={handleSubmit}>
                    <div className="mb-8">
                      <Input name="password" type="password" label="Antigua contraseña" value={formData.password} onChange={handleChange} errorMessage={errorsForm.password}/>
                      <Input name="newPassword" type="password" label="Nueva contraseña" value={formData.newPassword} onChange={handleChange} errorMessage={errorsForm.newPassword}/>
                    </div>
                    <button className="bg-secondary hover:bg-secondary-hover transition-colors text-white py-2 px-4 rounded md:w-46 ph:w-52 h-10 flex justify-center items-center gap-3">
                      {isLoadingSubmit ? <Loader2 className='w-4 h-4 animate-spin text-white' /> : 'Cambiar contraseña'}
                    </button>
                  </form>
                </div>
          </div>
        </>
    )
}

export default ChangePasswordPage;