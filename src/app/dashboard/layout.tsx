import MedicalAssistant from "@/components/ChatBot/MedicalAssistant";
import Providers from "@/components/Providers";

/**
 * Layout del directorio Dashboard que se encarga de enseñar el modal del asistente médico y los componentes de la aplicación
 * en todas las páginas hijas de Dashboard
 * @param {children}: {children: React.ReactNode}
 * @returns 
 */
export default function RootLayout({children}: {children: React.ReactNode;}) {    
    return(
        <Providers>
            {children}
            <MedicalAssistant />
        </Providers>
    )
}
