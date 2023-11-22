
// create a new application

import express from 'express';
import prisma from "./lib/index.js";
import Authenticate from "./lib/middleware/Authenticate.js";



import { config } from 'dotenv';
const SECRET_KEY = "secret"

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const router = express.Router();

// soo jiido applications  so that users and admin can see them 

router.get("/", Authenticate, async (req, res) => {

    try {
        // check if user is admin or not
        const { role } = req.decodedToken;

       
        if  (role === "ADMIN") {
            const applications = await prisma.application.findMany();
            return res.status(200).json(applications);
        } else {
            const applications = await prisma.application.findMany({
                where: {
                    userId: req.decodedToken.id,
                },
            });
            return res.status(200).json(applications);
        }


        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
);







//  apply for a job  jobid and userid and application status by default is pending 

router.post("/apply/:jobId", Authenticate, async (req, res) => {
    const { jobId } = req.params;
    const { id: userId } = req.decodedToken;

    try {
        const existingApplication = await prisma.application.findUnique({
            where: {
                 
                    jobId: parseInt(jobId),
                    userId: parseInt(userId),
                
            },
        });
        if (existingApplication) {
            return res.status(400).json({ error: "Application already exists" });
        }

        const application = await prisma.application.create({
            data: {
                jobId: parseInt(jobId),
                userId: parseInt(userId),
                status: "PENDING",
            },

        });
        return res.status(201).json(application);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
);

// update application status by admin

router.put("/:id", Authenticate, async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {

        // check if user is admin or not

        const { role } = req.decodedToken;

        if (role !== "ADMIN") {
            return res.status(401).json({ error: "You are not authorized to update application status" });
        }


        // check if the application exists

        const existingApplication = await prisma.application.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!existingApplication) {
            return res.status(404).json({ error: "Application does not exist" });
        }


        const application = await prisma.application.update({
            where: {
                id: parseInt(id),

            },
            data: {
                status: status,
            },
        });
        return res.status(200).json(application);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
);


// delete application by admin







export default router;