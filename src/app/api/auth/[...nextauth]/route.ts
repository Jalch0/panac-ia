import NextAuth from "next-auth/next";
import prisma from "../../../../../prisma";
import { connectToDatabase } from "@/helpers/server-helpers";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from 'bcryptjs'

/**
 * Manejador de rutas que gestiona la autenticación de usuarios utilizando el proveedor de credenciales.
 * @returns El manejador de autenticación de NextAuth.
 */
const handler = NextAuth({
    providers: [
        CredentialsProvider({
           name: 'credentials',
           credentials: {
            email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com"},
            password: { label: "Password", type: "password", placeholder: "*****" }
           },
           async authorize(credentials, req) {
            await connectToDatabase()

            //Busca el usuario en la BBDD
            const userFound = await prisma.user.findUnique({
                where: {
                    email: credentials!.email
                }
            })
            if(!userFound) throw new Error("Usuario o contraseña no válidos")

            //Compara las contraseñas
            const passwordMatch = await bcrypt.compare(credentials!.password, userFound.hashedPassword)
            if(!passwordMatch) throw new Error("Usuario o contraseña no válidos")

            console.log(userFound)

            return userFound
           }
        })
    ],
    callbacks: {
        jwt({account, token, user, profile, session, trigger}){
            if(user){
                token.user = user
            }

            if (trigger === "update" && session) {
                token = {...token, user : session}
                return token;
              };

            return token;
        },
        session({session, token}){
            session.user = token.user as any;
            return session
        },
    },
    pages: {
        signIn: '/login',
    }
});

export { handler as GET, handler as POST }