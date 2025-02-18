import { log } from "console";
import { AppDataSource } from "./ormconfig";

AppDataSource.initialize()
.then(() => console.log('Conntected to DB'))
.catch((error)=> console.log('DB connection error', error))