import prisma from "../../prisma"

/**
 * Función asíncrona que conecta con la base de datos en MongoDB utilizando Prisma
 */
export const connectToDatabase = async () => {
    try {
        await prisma.$connect()
    } catch (error) {
        console.error(error)
        throw new Error("Unable to connect to database")
    }
}