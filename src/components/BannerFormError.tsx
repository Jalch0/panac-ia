import { MdErrorOutline } from "react-icons/md";

interface BannerFormErrorProps {
    error: string;
    color: 'blue' | 'green';
  }

/**
 * Componente que enseña un Banner de error en los formularios Login y Registro
 * @param {error, color} 
 * @returns <BannerFormError />
 */
const BannerFormError: React.FC<BannerFormErrorProps> = ({error, color}) => {
    return (
        <div className={`w-full ${color == 'green' ? 'bg-teal-100 border-secondary text-teal-900' : 'bg-sky-100 border-primary text-sky-950'}  border-t-4  rounded-b  px-4 py-3 my-3 shadow-md rounded-xl`} role="alert">
            <div className="flex justify-center items-center gap-1">
                <div className="text-lg">
                    <MdErrorOutline />
                </div>
                <p className="font-bold">¡Error en el formulario!</p>
            </div>
            <div>
                <p className="text-sm">{error}</p>
            </div>
        </div>
    );
  };
  
  export default BannerFormError;