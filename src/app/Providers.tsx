'use client'
import {SessionProvider} from 'next-auth/react'

/**
 * Función que establece el proveedor de sesión para la aplicación, que se utiliza para gestionar la autenticación de usuario.
 * @param children
 * @returns
 */
export function Providers({children}: {children: React.ReactNode}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default Providers