// create crud operations for jobs
// use admin middleware for jobs for create update and delete 

import express from 'express';
import Authenticate from "./lib/middleware/Authenticate.js";

import prisma from "./lib/index.js";

const router = express.Router();
// create crud operations for applications

router.get("/",  async (req, res) => {

    try {
        const applications = await prisma.application.findMany();
        return res.status(200).json(applications);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}   
);


router.get("/:id",  async (req, res) => {

    try {
        const application = await prisma.application.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        return res.status(200).json(application);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}   
);

// create crud operations for jobs

router.post("/",  Authenticate, async (req, res) => {

    


    const { title, description,  salary } = req.body;
    
    try {

         // check if the user is admin or not 
        const { role, id} = req.decodedToken;
        if (role ===  "ADMIN") {

            // create job

            const job = await prisma.job.create({
                data: {
                    title: title,
                    description: description,
                    salary: salary,
                    userId: id,
                    
                },
            });


            return res.status(201).json(job);


        }

        return res.status(401).json({ error: "Not authorized" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

);

export default router;