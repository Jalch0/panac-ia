'use client'

import { IoClose } from "react-icons/io5";

interface IModalDeleteAccountProps {
    onCancel: () => void;
    onDelete: () => void;
  }

/**
 * Modal emergente que solicita confirmación antes de eliminar la cuenta del usuario
 * @param {onCancel, onDelete} 
 * @returns <ModalDeleteAccount />
 */
const ModalDeleteAccount: React.FC<IModalDeleteAccountProps> = ({onCancel, onDelete}) => {

  return (
    <>
      <div className="fixed inset-0 z-50 left-0 top-0 h-full w-full bg-gray-600 bg-opacity-60 flex items-center justify-center">
        <div className="bg-white ph:w-10/12 sm:w-2/3 md:w-4/5 lg:w-5/12 ph:h-60 md:h-44 flex flex-col text-center items-center justify-center rounded-xl">
            <div className="w-full flex justify-end pr-5 mt-[-0.5rem]">
                <button className="w-6 h-6 hover:bg-gray-200 rounded-full transition-all flex items-center justify-center" onClick={onCancel}>
                    <IoClose />
                </button>
            </div>
            <h2>¿Estás seguro que deseas borrar tu cuenta?</h2>
            <div className="mt-8 flex md:flex-row ph:flex-col md:gap-5 ph:gap-5 lg:justify-start ph:justify-center ph:items-center"> 
                <button onClick={onDelete} className="bg-red-500 hover:bg-red-600 transition-colors text-white py-2 px-4 rounded md:w-46 ph:w-52 flex justify-center items-center gap-3">
                    Sí, estoy seguro
                </button>
                <button onClick={onCancel} className="bg-secondary hover:bg-secondary-hover transition-colors text-white py-2 px-4 rounded md:w-46 ph:w-52 flex justify-center items-center gap-3">
                    No, cancelar
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default ModalDeleteAccount;
