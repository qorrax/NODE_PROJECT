
import express from 'express';


// create route here

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});


export default router;