type formData = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

/**
 * Función que valida que la información pasada a través del formulario sea correcta
 * @param data 
 * @returns errors
 */
const validateForm = (data: formData) => {
    const errors: {[key: string]: string} = {};
  
    // Validar nombre
    if (!data.name.trim()) {
      errors.name = "El nombre no puede estar vacío";
    } else if (!/^[a-záéíóúÁÉÍÓÚA-Z\s]+$/.test(data.name.trim())) {
      errors.name = "El nombre solo puede contener caracteres alfabéticos y espacios";
    } else if(data.name.trim().length < 3){
      errors.name = "El nombre no puede ser inferior a 3 letras"
    }

    // Validar apellidos
    if (!data.lastName.trim()) {
      errors.lastName = "Los apellidos no pueden estar vacíos";
    } else if (!/^[a-záéíóúÁÉÍÓÚA-Z\s]+$/.test(data.lastName.trim())) {
      errors.lastName = "Los apellidos solo pueden contener caracteres alfabéticos y espacios";
    } else if(data.lastName.trim().length < 3){
      errors.lastName = "Los apellidos no puede ser inferiores a 3 letras"
    }
  
    // Validar email
    if (!data.email.trim()) {
      errors.email = "El email no puede estar vacío";
    } else if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
      errors.email = "El email no es válido";
    }
  
    // Validar contraseña
    if (!data.password.trim()) {
      errors.password = "La contraseña no puede estar vacía";
    }
  
    // Validar confirmar contraseña
    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
  
    return errors;
  };

export default validateForm;