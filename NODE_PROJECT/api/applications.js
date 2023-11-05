
// create a new application

import express from 'express';

const router = express.Router();

// create route here

router.post('/', (req, res) => {
    res.send("Hello world from applications.js");
});

export default router;