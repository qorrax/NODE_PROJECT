
import express from 'express';
import prisma from "./lib/index.js";

const router = express.Router();
import { config } from 'dotenv';
const SECRET_KEY = "secret"

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import e from 'express';



    //get all admins

    router.get("/", async (req, res) => {
        try {
            const admins = await prisma.admin.findMany();
            return res.status(200).json(admins);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    );

    // get one  admin by id


    router.get("/:id", async (req, res) => {

        const { id } = req.params;

        try {

            const admin = await prisma.admin.findUnique({
                where: {
                    id: parseInt(id),
                },
            });
            return res.status(200).json(admin);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    );

    // create admin signup

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


       

     // create admin login 


     router.post("/login", async (req, res ) => {

       const {email, password} = req.body;

       try {

        const existingAdmin = await prisma.admin.findUnique({
            where : {
                email:email,

            }, });

        if(!existingAdmin) {

            return res.status(404).json({
              messge: "admin not found",

            });
        }


        // check if password is correct 

        const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);

        if(!isPasswordCorrect) {
            return res.status(404).json({
                message: "invalid credintials",
            });

        }
        

        // create a token using jwt

        const token = jwt.sign(
            { id: existingAdmin.id,email: existingAdmin.email },
            SECRET_KEY,
            { expiresIn: "1h" }                                                         
            
     );


            return res.status(200).json({
                message: "Admin logged in successfully",
                token: token,
            });
         } catch (error) {
                res.status(500).json({
                    message: "Something went wrong",
                    error: error.message,
                });
            }

        }
    );



    // update admin by id

    router.put("/:id", async (req, res) => {
        
        try {

            const { id } = req.params;
            const { name,email} = req.body;

            const admin  = await prisma.admin.update({
                where: {
                    id: Numer(id),
                },
                data: {
                    name: name,
                    email: email,
                    
               },
            });

            if(!admin) {
                return res.status(404).json({
                    message: "Admin not found",
                });
            }

            return res.status(200).json({
                message: "Admin updated successfully",
                admin: admin,
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }});

    // delete admin by id

    router.delete("/:id", async (req, res) => {
        
        try {
           
            const admin  = await prisma.admin.delete({
                where: {
                    id: Number(req.params.id),
                },
            });
         
            if(admin) {
                return res.status(200).json({
                    message: "Admin was deleted successfully",
                });
            }  else {
                return res.status(404).json({
                    message: "Admin not found",
                });
            }

           
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    });




       

        
    
export default router;
