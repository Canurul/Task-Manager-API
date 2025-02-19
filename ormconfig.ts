import { DataSource } from "typeorm";
import { Task } from "./src/entities/Task";
import { User } from "./src/entities/User";
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, //use only in development!!!
  logging: true,
  entities: [User, Task], 
});