type formPassword = {
    password?: string;
    newPassword?: string;
  }

/**
 * Función que valida que la información pasada a través del formulario sea correcta
 * @param data 
 * @returns errors
 */
const validatePassword = (data: formPassword) => {
    const errors: {[key: string]: string} = {};

        // Validar contraseña
        if (!data.password?.trim()) {
          errors.password = "La contraseña no puede estar vacía";
        }

        // Validar contraseña
        if (!data.newPassword?.trim()) {
          errors.newPassword = "La contraseña no puede estar vacía";
        }

    return errors;
};

export default validatePassword;