
import express, {json} from 'express';
import adminRouter from './admin.js';
import applicationsRouter from './applications.js';
import usersRouter  from './users.js';


const server = express();
server.use(json());


server.use('/api/admin', adminRouter);
server.use("/api/applications",applicationsRouter)
server.use("/api/users",usersRouter)


export default server;