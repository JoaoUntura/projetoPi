import express from 'express';
import userRoutes from "./routes/userRoutes.js";


const api = express();
api.use(express.json());

api.use('/api', userRoutes);

export default api;