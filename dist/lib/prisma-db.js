"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaDb = void 0;
const client_1 = require("@prisma/client");
exports.prismaDb = globalThis.prisma || new client_1.PrismaClient();
if (process.env.NODE_ENV !== "production")
    globalThis.prisma = exports.prismaDb;
