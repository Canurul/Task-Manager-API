import { DataSource } from "typeorm";
import { Task } from "./src/entities/Task";
import { User } from "./src/entities/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "user",
  password: "userpassword",
  database: "task_db",
  synchronize: true, //use only in development!!!
  logging: true,
  entities: [User, Task], 
});