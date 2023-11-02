
import express, {json} from 'express';

import adminRouter from './admin.js';

const server = express();

server.use(json());


server.use('/api/admin', adminRouter);


export default server;