# 🚀 PANAC-IA - Una integración de Google Maps API con un asistente virtual 🔎

![preview](.assets/5.png)

## Dependencias utilizadas en el desarrollo del programa

- [NextJS](https://gulpjs.com/](https://react-hot-toast.com/))
- [Next-Auth](https://next-auth.js.org/)
- [React Google Maps Api](https://visgl.github.io/react-google-maps/)
- [MongoDB](https://www.mongodb.com/)
- [Prisma](https://www.prisma.io/)

## Introducción

![preview](.assets/3.png)

Inicialmente, el sistema dispone de un panel que permite al usuario identificar los hospitales cercanos en un radio de hasta 2.5 kilómetros. Asimismo, el usuario tiene la opción de seleccionar entre visualizar solo Farmacias, dentistas o, por defecto, hospitales. Esta funcionalidad está disponible en cualquier ubicación global, siempre que los lugares estén etiquetados en Google Maps como sitios pertenecientes al sector de la salud. Además, el sistema incluye un buscador personalizado que permite localizar el hospital o establecimiento de salud de preferencia del usuario dentro de un radio de 5 kilómetros.

![preview](.assets/4.png)

Cada lugar dispone de una tarjeta en la que se muestra la ubicación proporcionada por Google Maps, su valoración representada en estrellas, el estado de abierto o cerrado, y una imagen del lugar. Además, en el mapa de Google, el lugar se detallará con un icono específico.

![preview](.assets/1.png)

Por otro lado, se incluye una base de datos que permite al usuario registrarse y acceder a las funciones estándar del programa, creando la posibilidad de escalar el sistema para incluir características como lugares favoritos o traslados en tiempo real.

Finalmente, el sistema cuenta con un asistente virtual que integra la API de OpenAI con ChatGPT, configurado para proporcionar únicamente instrucciones relacionadas con el área de la salud. Este asistente enfatiza siempre que las recomendaciones y orientaciones deben ser confirmadas por un especialista en la materia.

![preview](.assets/2.png)

## Instalación del programa

1.  `git clone https://github.com/Jalch0/panac-ia.git`
2.  En el archivo .env se deberá agregar las API de OpenAI y de Google Maps, La base de datos y las claves correspondientes al Next-Auth y el Cloudinary.
3.  `DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET, GOOGLE_MAPS_API_KEY, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET`
4.  En el archivo schema.prisma se ubicará el modelo de base datos que se utilizó en mongoDB.
5.  Es importante que al momento de agregar la API de Google, la misma en la cloud console, deberá estar habilitado para la opción "Places"
6.  `npm install`
7.  `npm run dev`

## Requisitos del programa

1. Extensión NO-CORS en Google Chrome.

## Link del sitio.

- [PANAC-IA](https://panac-ia.vercel.app/)
