
import express, {json} from 'express';
import adminRouter from './admin.js';
import applicationsRouter from './applications.js';
import usersRouter  from './users.js';
import jobsRouter from './jobs.js';


const server = express();
server.use(json());


server.use('/api/admin', adminRouter);
server.use("/api/applications",applicationsRouter)
server.use("/api/users",usersRouter)
server.use("/api/jobs",jobsRouter)


export default server;