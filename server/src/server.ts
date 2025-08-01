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
import OTPEndpoint from './routes/otp.routes.ts';
import AccountEndpoint from './routes/account.routes.ts';

const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:['http://localhost:3000', 'https://crimexis.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))


await connectToMongoose();

app.use('/api/auth', AuthEndpoint);
app.use('/api/crimework', CrimeEndpoint);
app.use('/api/protected', ProtectedEndpoint);
app.use('/api/hotspots', HotspotsEndpoint);
app.use('/api/OTP', OTPEndpoint);
app.use('/api/account', AccountEndpoint);




app.listen(process.env.BACKEND_PORT, () => {
    console.log(`Server is running on port ${process.env.BACKEND_PORT}`);
});