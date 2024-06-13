'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Input from "@/components/Input";
import validateForm from "./validateForm";
import BannerAlert from "@/components/BannerAlert";
import axios, { AxiosError } from "axios";
import ModalDeleteAccount from "@/components/ModalDeleteAccount";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import DefaultPicture from '@/components/Icons/noPicture.png'
import { FaCamera } from "react-icons/fa";

declare module "next-auth" {
    interface Session {
        user?: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            lastName?: string | null;
        };
    }
}

/**
 * Componente y página que representa a la pantalla del perfil de usuario
 * @returns Página de Perfil de usuario
 */
function ProfilePage() {
    const { data: session, update } = useSession();
    const [bannerInfo, setBannerInfo] = useState({visible: false, title: '', message: ''})
    const [errorsForm, setErrorsForm] = useState<{[key: string]: string}>({});
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [originalFormData, setOriginalFormData] = useState({name: "", lastName: "", email: "", image: ""});
    const [formData, setFormData] = useState({name: "", lastName: "", email: "", image: ""});
    const [userNewAvatar, setUserNewAvatar] = useState<string | null>(null);
    const [file, setFile] = useState<File |null>(null);
    const [defaultImage, setDefaultImage] = useState<any>(DefaultPicture);
    const formChanged = JSON.stringify(formData) !== JSON.stringify(originalFormData);
    const router = useRouter();

    useEffect(() => {
        if(session?.user){
            setFormData({
                name: session.user.name || "",
                lastName: session.user.lastName || "",
                email: session.user.email || "",
                image: session.user.image || "",
            });
            setOriginalFormData({
                name: session.user.name || "",
                lastName: session.user.lastName || "",
                email: session.user.email || "",
                image: session.user.image || "",
            })
            setDefaultImage(session.user.image ? session.user.image : DefaultPicture)
        }
    }, [session])

    /**
    * Función que actualiza los datos de un usuario
    * @param e 
    * @returns {Promise<void>}
    */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setIsLoading(true);


        //Cargar imagen
        let imageUrl = formData.image;
        if(file){
            const formData = new FormData()
            formData.append('image', file);
    
            const imageResponse = await fetch('/api/uploadImage', {
                method: 'POST',
                body: formData
            });

            const data = await imageResponse.json();
            imageUrl = data.url;
        }


        // Validar el formulario
        const formErrors = validateForm(formData);
        setErrorsForm(formErrors);
        
        if (Object.keys(formErrors).length !== 0) {
            return;
        }

        try {
            const updateUserResponse = await axios.post('/api/auth/updateUser', {
                name: formData.name,
                email: formData.email,
                lastName: formData.lastName,
                image: imageUrl,
            });

            setBannerInfo({
                message: 'Los datos han sido modificados correctamente',
                title: '¡Bien hecho!',
                visible: true,
            })
            update({...session!.user, name: formData.name, lastName: formData.lastName, image: imageUrl});
            setIsLoading(false);

        } catch (error) {
            if(error instanceof AxiosError){
                console.error(error)
                setBannerInfo({
                    message: error.response?.data.message,
                    title: '¡Error inesperado!',
                    visible: true,
                })
            }
        }
    }

  /**
   * Función que elimina el usuario cuya sesión está iniciada
   */
  const handleOnDelete = async() => {
        try{
            const deleteUserResponse = await axios.post('/api/auth/deleteUser', {
                email: formData.email,
            });
            setIsModalVisible(false);
            setBannerInfo({
                message: 'Su cuenta se ha borrado exitosamente',
                title: '¡Esperamos que vuelvas!',
                visible: true,
            })
            signOut()
        }catch(error){
            if(error instanceof AxiosError){
                setIsModalVisible(false);
                setBannerInfo({
                    message: error.response?.data.message,
                    title: '¡Error inesperado!',
                    visible: true,
                })
              }
            setIsLoading(false);
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

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        event.target.files && setFile(event.target.files[0]);
    };

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setUserNewAvatar(objectUrl);
            setFormData((prev) => ({...prev, image: objectUrl}))
        }
    }, [file])

    return(
        <>
            {isModalVisible &&
                <ModalDeleteAccount onCancel={() => setIsModalVisible(false)} onDelete={handleOnDelete}/>
            }
            <div className="min-h-[calc(93vh)] w-full bg-gray-200/50 flex flex-col justify-center items-center ph:pb-10">
                <h2 className="mt-8 mb-2 font-semibold lg:text-2xl sm:text-2xl ph:text-2xl text-balance text-primary">Mi perfil</h2>
                <div className="mb-8 bg-white flex flex-col p-10 ph:w-full md:w-3/4 lg:w-2/5 rounded-2xl shadow-lg">
                    <div>
                        <div className="flex justify-center">
                            <label className={`text-sm bg-stone-200 hover:bg-stone-300 w-40 h-40 rounded-full transition-all cursor-pointer`} htmlFor="fileUpload">
                                <input type="file" className="hidden" id="fileUpload" accept="image/png, image/jpeg" onChange={handleImageUpload}/>
                                <div className="w-40 h-40 rounded-full absolute opacity-0 hover:opacity-70 bg-black flex flex-col items-center justify-center text-white text-xl transition-all"><FaCamera className="w-6 h-6"/>Subir foto</div>
                                {userNewAvatar ? (
                                    <Image src={userNewAvatar} alt="Preview" className="object-cover w-40 h-40 rounded-full transition-all hover:opacity-80" width={160} height={160}/>)
                                : (
                                    <Image src={defaultImage} alt="Default" className="object-cover w-40 h-40 rounded-full" width={160} height={160}/>
                                )}
                            </label>
                        </div>
                        {bannerInfo.visible &&
                            <BannerAlert color="green" title={bannerInfo.title} message={bannerInfo.message} onClose={() => setBannerInfo({visible: false, message: '', title: ''})}/>
                        }
                        <div>
                            <h2 className="mt-5 font-semibold text-lg text-gray-600">Mi información</h2>
                            <form onSubmit={handleSubmit} className="pb-5 border-b-2">
                                <Input label="Nombre" type="text" name="name" value={formData.name} onChange={handleChange} errorMessage={errorsForm.name}/>
                                <Input label="Apellidos" type="text" name="lastName" value={formData.lastName} onChange={handleChange} errorMessage={errorsForm.lastName}/>
                                <Input label="Email" type="text" name="email" value={formData.email} disabled/>
                                <div className="mt-8 flex md:flex-row ph:flex-col md:gap-5 ph:gap-5 lg:justify-start ph:justify-center ph:items-center">
                                    <button className={`${!formChanged ? 'bg-gray-400' : 'bg-primary hover:bg-primary-hover'} transition-colors text-white py-2 px-4 rounded md:w-44 ph:w-52 auto flex justify-center items-center gap-3`}
                                    disabled={!formChanged}>
                                        {isLoading ? <Loader2 className='animate-spin text-white' /> : 'Actualizar perfil'}
                                    </button>
                                    <button onClick={(e) => {e.preventDefault(); router.push("./profile/changePassword")}} className="bg-secondary hover:bg-secondary-hover transition-colors text-white py-2 px-4 rounded md:w-46 ph:w-52 flex justify-center items-center gap-3">
                                        Cambiar contraseña
                                    </button>
                                </div>
                            </form>
                            <div>
                                <h2 className="mt-5 font-semibold text-lg text-gray-600">Eliminar cuenta</h2>
                                <p className="mt-4 mb-5 text-xs text-gray-600">Toda la información relacionada a tu cuenta será eliminada</p>
                                <div className="flex ph:justify-center lg:justify-start">
                                    <button className="bg-red-500 hover:bg-red-600 transition-colors text-white py-2 px-4 rounded md:w-44 ph:w-52 flex justify-center items-center gap-3"
                                        onClick={() => setIsModalVisible(true)}>
                                        Eliminar cuenta
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;