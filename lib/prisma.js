import { PrismaClient } from "./generated/prisma";

const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production"){
    globalThis.prisma = db
}

export {db}
// globalThis.prisma - this global variable ensures that the PrismaClient instance is reused across 
// hot reloads in development mode, preventing multiple instances from being created.      