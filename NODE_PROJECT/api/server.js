
import express from 'express';

import AdminRouter from './admin.js';

const server = express();

server.use(express.json());


server.use('api/admin', AdminRouter);


export default server;