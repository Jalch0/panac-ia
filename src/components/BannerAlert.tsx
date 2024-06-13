import { MdErrorOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

interface BannerFormErrorProps {
    message: string;
    title: string;
    color: 'red' | 'green';
    onClose: () => void;
  }

/**
 * Componente que enseña un Banner de acierto, advertencia o error
 * @param {message, title, color, onClose} 
 * @returns <BannerAlert />
 */
const BannerAlert: React.FC<BannerFormErrorProps> = ({message, title, color, onClose}) => {
    return (
        <div className={`w-full ${color == 'green' ? 'bg-teal-100 border-secondary text-teal-900' : 'bg-red-200 border-red-600 text-red-950'}  border-t-4  rounded-b  px-4 py-3 my-3 shadow-md rounded-xl`} role="alert">
            <div className="flex justify-end my-[-0.5rem]">
                <button onClick={onClose}>
                    <IoClose />
                </button>
            </div>
            <div className="flex justify-center items-center gap-1">
                <div className="text-lg">
                    {color == 'red' ?
                         <MdErrorOutline />
                    :
                        <FaCheckCircle />
                    }
                </div>
                <p className="font-bold">{title}</p>
            </div>
            <div>
                <p className="text-sm text-center">{message}</p>
            </div>
        </div>
    );
  };
  
  export default BannerAlert;