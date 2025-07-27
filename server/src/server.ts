import dotenv from 'dotenv';
dotenv.config()
import cors from 'cors';
import express from 'express';
import AuthEndpoint from './routes/auth.routes.ts';
import connectToMongoose from './configs/db.config.ts';
import CrimeEndpoint from './routes/crime.routes.ts';
import ProtectedEndpoint from './routes/protected.route.ts';
import cookieParser from 'cookie-parser';
import HotspotsEndpoint from './routes/hotspots.route.ts';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:['http://localhost:3000', 'http://192.168.1.5:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))


await connectToMongoose();

app.use('/api/auth', AuthEndpoint);
app.use('/api/crimework', CrimeEndpoint);
app.use('/api/protected', ProtectedEndpoint);
app.use('/api/hotspots', HotspotsEndpoint);




app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Server is running on port ${process.env.BACKEND_PORT}`);
});