import express from 'express';
import UserRoutes from './users/routes';
import cors from "cors";
const app = express()
app.use(cors());
UserRoutes(app);
app.listen(4000)