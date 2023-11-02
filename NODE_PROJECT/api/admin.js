
import express from 'express';

const router = express.Router();

// create route here
router.get('/', (req, res) => {
    res.send("Hello from admin team");
});



export default router;
