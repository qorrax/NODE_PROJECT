
import express from 'express';
import prisma from "./lib/index.js";

import { config } from 'dotenv';
const SECRET_KEY = "secret"

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();


        //get all users

        router.get("/", async (req, res) => {
            try {
                const users = await prisma.user.findMany();
                return res.status(200).json(users);
                } catch (error) {
                return res.status(500).json({ error: error.message });
        }
        }
        );



        // create user sing up route here

        router.post("/signup", async (req, res) => {

        const {name, email, password} = req.body;

        try {

        const existingUser = await prisma.user.findUnique({
                where: {
                email: email,
        },
        });
                if (existingUser) {
                return res.status(404).json({
                error: "User already exists",
        });
        }


        // hash password


        const  hashedPassword = await bcrypt.hash(password, 10);


        const newUser = await prisma.user.create({
                data: {
                name: name,
                email: email,
                password: hashedPassword,
        },
        });

             return res.status(201).json({user:"user created successfully"});
        }

            catch (error) {
            return res.status(500).json({ error: error.message });
        }});

        // create user login route here


          
     router.post("/login", async (req, res ) => {

        const {email, password} = req.body;
 
        try {
 
         const existingUser = await prisma.user.findUnique({
             where : {
                 email:email,
 
             }, });
 
         if(!existingUser) {
 
             return res.status(404).json({
               messge: "admin not found",
 
             });
         }
 
 
         // check if password is correct 
 
         const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
 
         if(!isPasswordCorrect) {
             return res.status(404).json({
                 message: "invalid credintials",
             });
 
         }
         
 
         // create a token using jwt
 
         const token = jwt.sign(
             { id: existingUser.id,email: existingUser.email },
             SECRET_KEY,
             { expiresIn: "1h" }                                                         
             
      );
 
 
             return res.status(200).json({
                 message: "User logged in successfully",
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
 



        // create user profile route here

        router.get("/profile", async (req, res) => {
        const { id } = req.user;
        try {
        const user = await prisma.user.findUnique({
                where: {
                id: id,
        },
        });
                if (!user) {
                return res.status(404).json({
                error: "User does not exist",
        });
        }
                return res.status(200).json({ user: user });
        } catch (error) {
        return res.status(500).json({ error: error.message });
        }
        }
        );

        // create user update profile route here




export default router;



