
import express from 'express';
import prisma from "./lib/index.js";
const router = express.Router();

import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";



  router.get("/", async (req, res) => {
    res.send("hello from admin");
    }
    );

    // create admin route here with bcrypt and use findUnique to check if admin already exists

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


 

 // admin signup route here

    // router.post("/signup", async (req, res) => {
    //     const {name, email, password} = req.body;

    //     try {

    //      const existingAdmin  = await prisma.admin.findUnique({
    //             where: {
    //                 email: email,             
                
    //             },
    //         });
    //         if (existingAdmin) {
    //             return res.status(404).json({ 
    //             message: "Admin already existing!" 
    //         });
    //         }

    //             // hash password

    //             const hashedPassword= await bcrypt.hash(password, 10);

    //             // create admin

    //             const newAdmin = await prisma.admin.create({
    //                 data: {
    //                     name: name,
    //                     email: email,
    //                     password: hashedPassword,
    //                 },
    //             });

    //             return res.status(201).json({
    //             message: "Admin created successfully",
    //             admin: newAdmin,
    //             });
    //         } catch (error) {
    //             res.status(500).json({ 
    //             message: "Something went wrong",
    //             error: error.message,
    //             });
        
    //     }
    // });
                
        

        
    





export default router;
