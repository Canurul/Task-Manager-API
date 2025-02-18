import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "user",
  password: "rootpassword",
  database: "task_db",
  synchronize: true, //use only in development!!!
  logging: true,
  entities: ["src/entities/*.ts"], 
});