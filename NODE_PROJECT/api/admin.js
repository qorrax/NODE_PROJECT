
import express from 'express';
import prisma from "./lib/index.js";
const router = express.Router();
const SECRET_KEY = "secret"

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



//   router.get("/", async (req, res) => {
//     res.send("waa new admin");
//     }
//     );

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


       

     // create admin login 


     router.post("/login", async (req, res ) => {

       const {email, password} = req.body;


       try {

        const existingAdmin = await prisma.findUnique({
            where : {
                email:email,

            },

        });

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




   
    






    
        

        
    





export default router;
