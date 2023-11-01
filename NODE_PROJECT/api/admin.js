

import express from 'express';

const router = express.Router();

router.get('/admin', (req, res) => {
    res.status(200).json({ api: 'running' });
});



export default router;