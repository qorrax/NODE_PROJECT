
import express from 'express';

const router = express.Router();

// create route here
router.get('/', (req, res) => {
    res.send("Hello world from admin.js");
});



export default router;
