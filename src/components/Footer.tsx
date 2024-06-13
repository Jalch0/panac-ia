import Link from "next/link";
import Logo from "@/components/images/logoApp.svg"
import Image from "next/image";

/**
 * Componente que renderiza el Footer del sitio web de PANAC-IA
 * @returns <Footer />
 */
const Footer: React.FC = () => {
    return(
        <footer className="bg-white shadow dark:bg-gray-900 w-full">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between md:pt-2 md:pl-4 ph:pt-5 ph:pl-3">
                    <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Image src={Logo} alt='chatbotImage'  className='w-8 h-8'/>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PANAC-IA</span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 ph:gap-3">
                        <li>
                            <Link href="https://www.google.com/intl/es/help/terms_maps/" target="_blank" className="hover:underline me-4 md:me-6">Políticas de Uso Google Maps</Link>
                        </li>
                        <li>
                            <Link href="https://openai.com/es-ES/policies/terms-of-use" target="_blank" className="hover:underline me-4 md:me-6">Condiciones OpenAI</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href={"/"} className="hover:underline">PANAC-IA™</Link>. Todos los derechos reservados.</span>
            </div>
        </footer>
    )
}

export default Footer;