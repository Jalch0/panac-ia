import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import prisma from "../../../../../prisma";

/**
 * Función asíncrona que maneja la solicitud POST para actualizar la contraseña de un usuario en la base de datos.
 * @param { Request }
 * @returns NextResponse.json({updateUser}, {status: 201}) respuesta que contiene un objeto con el usuario actualizado y un estado de respuesta 201 si la operación fue exitosa.
 * @returns console.error(error) respuesta de error con un mensaje específico y un estado de respuesta correspondiente si la operación falla.
 */
export const POST = async (req: Request) => {
    try {
        const { email, password, newPassword } = await req.json();
        const hashedNewPassword = await await bcrypt.hash(newPassword,10);

        await connectToDatabase();

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!user) throw new Error("Usuario o contraseña no válidos")

        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

        if(!passwordMatch) return NextResponse.json({message:"La contraseña proporcionada no es correcta"}, {status: 422});

        const updateUser = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                hashedPassword: hashedNewPassword
            }
        });

        return NextResponse.json({updateUser}, {status: 201});

    } catch (error) {
        console.error(error)
    }
}