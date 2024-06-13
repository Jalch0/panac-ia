import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

/**
 * Función asíncrona que maneja la solicitud POST para eliminar un usuario de la base de datos.
 * @param { Request }
 * @returns true: NextResponse.json({deletedUser}, {status: 201}) respuesta que contiene un objeto con el usuario eliminado y un estado de respuesta 201.
 * @returns false: console.error(error)
 */
export const POST = async (req: Request) => {
    try {
        const { email } = await req.json();

        await connectToDatabase();

        const deletedUser = await prisma.user.delete({
            where: {
                email: email
            }
        });

        return NextResponse.json({deletedUser}, {status: 201});

    } catch (error) {
        console.error(error)
    }
}