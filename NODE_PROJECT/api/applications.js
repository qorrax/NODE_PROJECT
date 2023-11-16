
// create a new application

import express from 'express';
import prisma from "./lib/index.js";

import { config } from 'dotenv';
const SECRET_KEY = "secret"

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();

// create  application sighn uproute here


router.post("/signup", async (req, res) => {
    const  { userId, jobId} = req.body;

    try {
        const existingApplication = await prisma.application.findUnique({
            where: {
                userId: userId,
            },
        });
        if (existingApplication) {
            return res.status(404).json({
                error: "Application already exists",
            });
        }
        const application = await prisma.application.create({
            data: {
                userId: userId,
                jobId: jobId,
            },
        });
        return res.status(201).json({application:"application created successfully"});
    }

    catch (error) {
        return res.status(500).json({ error: error.message });
    }

}
);





export default router;