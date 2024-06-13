import { connectToDatabase } from "@/helpers/server-helpers";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import bcrypt from 'bcrypt'
import { Prisma } from "@prisma/client";

/**
 * Función asíncrona que maneja la solicitud POST para crear un nuevo usuario en la base de datos.
 * @param { Request }
 * @returns NextResponse.json({response}, {status: 201}) respuesta que contiene un objeto con el nuevo usuario creado y un estado de respuesta 201 si la operación fue exitosa.
 * @returns NextResponse.json({message: "Server Error"}, {status: 500}) respuesta de error con un mensaje específico y un estado de respuesta correspondiente si la operación falla.
 */
export const POST = async (req: Request) => {
    try {
        const { name, lastName, email, password } = await req.json()
        //Valida que los campos NO estén vacíos
        if(!name || !lastName || !email || !password) return NextResponse.json({message:"Asegúrate de ingresar la información correctamente en todos los campos."}, {status: 422})
        //Hashea la contraseña para más seguridad
        const hashedPassword = await bcrypt.hash(password,10)

        //Conexión a BBDD y creación de usuario
        await connectToDatabase()
        const user = await prisma.user.create({data:{email, name, lastName, hashedPassword}})

        const {hashedPassword: _, ...response} = user;

        return NextResponse.json({response}, {status: 201})
    } catch (error) {
        console.error(error)
        if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'){
            return NextResponse.json({message: "Ya existe un usuario con ese email."}, {status: 409})
        }
        return NextResponse.json({message: "Server Error"}, {status: 500})
    } finally {
        await prisma.$disconnect();
    }
};