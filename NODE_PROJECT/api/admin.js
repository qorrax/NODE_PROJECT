
import express from 'express';
import prisma from "./lib/index.js";
const router = express.Router();

import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// create route here
// router.get('/', async (req, res) => {

//    try {
//        const admins = await prisma.admin.findMany();
//         if(admins.length === 0) {
//             return res.status(404).json({ message: "hello there are no admins in the database"});
//         }
//         res.json(admins);
        
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }

//     router.get("/:id", async (req, res) => {

       
//         try {
//             const { id } = req.params;
//             const admin = await prisma.admin.findUnique({
//                 where: {
//                     id: Number(id),
//                 },
//             });
//             if (!admin) {
//                 return res.status(404).json({ message: "Admin not found!" });
//             }
//             res.json(admin);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     });

 

 // admin signup route here

    router.post("/signup", async (req, res) => {
        const {name, email, password} = req.body;

        try {

         const existingAdmin  = await prisma.admin.findUnique({
                where: {
                    email: email,             
                
                },
            });
            if (existingAdmin) {
                return res.status(404).json({ 
                message: "Admin already existing!" 
            });
            }

                // hash password

                const hashedPassword= await bcrypt.hash(password, 10);

                // create admin

                const newAdmin = await prisma.admin.create({
                    data: {
                        name: name,
                        email: email,
                        password: hashedPassword,
                    },
                });

                return res.status(201).json({
                message: "Admin created successfully",
                admin: newAdmin,
                });
            } catch (error) {
                res.status(500).json({ 
                message: "Something went wrong",
                error: error.message,
                });
        
        }
    });
                
        

        
    





export default router;
