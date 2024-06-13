import React, { InputHTMLAttributes } from "react";
import { BiError } from "react-icons/bi";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

/**
 * Componente Input que customiza y extiende la clase Input para personalizar las entradas de PANAC-IA
 * @param {label, errorMessage, ...inputProps} 
 * @returns <Input />
 */
const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  ...inputProps
}) => {
  return (
    <div className="w-full flex flex-col justify-center">
      <label className={`pt-4 pb-2 flex justify-start text-gray-600`}>
        {label} {inputProps.required && "*"}
      </label>
      <input
        className={`rounded-lg px-5 py-2 bg-gray-200 text-gray-600 border outline outline-offset-1 outline-1 outline-primary ${errorMessage && 'outline-red-600'} ${inputProps.disabled && 'text-opacity-40 outline-gray-400 bg-gray-100/95 hover:outline-gray-400'} hover:outline-primary-hover focus:outline-primary-focus`}
        {...inputProps}
      />
      {errorMessage && (
        <div className="flex pt-2 mb-[-0.5rem] px-5 justify-start text-left items-center text-red-600 gap-1">
          <BiError /><p className="text-xs">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
