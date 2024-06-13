import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

/**
 * Función asíncrona que maneja la solicitud POST para actualizar la información de un usuario en la base de datos.
 * @param { Request }
 * @returns true: NextResponse.json({updateUser}, {status: 201}) respuesta que contiene un objeto con el usuario actualizado y un estado de respuesta 201 si la operación fue exitosa.
 * @returns false: console.log(error)
 */
export const POST = async (req: Request) => {
    try {
        const { name, lastName, email, image } = await req.json();

        await connectToDatabase();

        const updateUser = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                name: name,
                lastName: lastName,
                image: image
            }
        });

        return NextResponse.json({updateUser}, {status: 201});

    } catch (error) {
        console.error(error)
    }
}