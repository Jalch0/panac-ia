//@ts-nocheck
import { PrismaClient } from "@prisma/client";

/**
 * Configuración y exportación de la instancia de PrismaClient para interactuar con la base de datos.
 * @ignore
 */
let prisma: PrismaClient;
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient;
    }
  }
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;