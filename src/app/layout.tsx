import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import { Providers } from "./Providers";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "800"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'PANAC-IA',
  description: '...',
}

/**
 * Layout principal del sitio que se encarga de enseñar el header y los componentes de la aplicación en todas las pantallas
 * @param {children} 
 * @returns 
 */
export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
