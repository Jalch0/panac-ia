'use client'

import React, { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MessagesProvider } from "@/context/messages"

interface ProvidersProps {
    children: ReactNode
}

/**
 * Componente que proporciona proveedores de contexto y cliente de consulta para la aplicación.
 * @param { children }
 * @returns <Providers /> Componente que envuelve los elementos hijos con los proveedores necesarios.
 */
const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <MessagesProvider>
                {children}
            </MessagesProvider>
        </QueryClientProvider>
    )
}

export default Providers;