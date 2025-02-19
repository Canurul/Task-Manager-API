import express from 'express';
import { AppDataSource } from "../ormconfig";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

AppDataSource.initialize()
.then(() => console.log('Conntected to DB'))
.catch((error)=> console.log('DB connection error', error));

app.get('/', (req, res) => {
    res.send('Task manager API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
});