
import express, {json} from 'express';
import adminRouter from './admin.js';
import applicationsRouter from './applications.js';


const server = express();
server.use(json());


server.use('/api/admin', adminRouter);
server.use("/api/applications",applicationsRouter)


export default server;