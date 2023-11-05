
import express from 'express';
import prisma from "./lib/index.js";
const router = express.Router();

// create route here
router.get('/', async (req, res) => {

   try {
       const admins = await prisma.admin.findMany();
        if(admins.length === 0) {
            return res.status(404).json({ message: "No admins found!"});
        }
        res.json(admins);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    router.get("/:id", async (req, res) => {

       
        try {
            const { id } = req.params;
            const admin = await prisma.admin.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (!admin) {
                return res.status(404).json({ message: "Admin not found!" });
            }
            res.json(admin);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

});

 // find unique route here

    router.get("/:id", async (req, res) => {


        try {

            const { id } = req.params;
            const admin = await prisma.admin.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if (!admin) {
                return res.status(404).json({ message: "Admin not found!" });
            }
            res.json(admin);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });




// create post route here


router.post('/create_admin', async (req, res) => {

    try {
        const { username, password } = req.body;
        const admin = await prisma.admin.create({
            data: {
            
                username,
                password,
            },
        });
        
        if (!admin) {
            return res.status(400).json({ message: "Admin not created!" });
        }
        res.json({message: "admin was created suceesfully", admin} );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }


    // create put route here

    router.pu("/update_admin/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const {username} = req.body;              
            const admin = await prisma.admin.update({
                where: {
                    id: Number(id),
                },
            });
            if (!admin) {
                return res.status(404).json({ message: "Admin was not updated!" });
            }
            res.json(admin);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });


    // create delete route here

    router.delete("/delete_admin/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const admin = await prisma.admin.delete({
                where: {
                    id: Number(id),
                },
            });
            if (!admin) {
                return res.status(404).json({ message: "Admin was not found!" });
            }
            res.json({message: "admin was deleted successfully",admin});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
});

export default router;
