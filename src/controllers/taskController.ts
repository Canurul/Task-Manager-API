import { AppDataSource } from "../../ormconfig";
import { Task } from "../entities/Task";
import { Request, Response } from 'express' ;

const taskRepository = AppDataSource.getRepository(Task);

//Create a new task
export const createTask = async (req: Request, res: Response) => {

    const { name, description } = req.body;
    const user = req.user;

    if(!user) {
        return res.status(401).json( { message: 'Not authorized' });
    }

    try{
        const newTask = taskRepository.create({
            name,
            description,
            isFinished: false,
            user
        })

        await taskRepository.save(newTask);

        res.status(201).json({
            id: newTask.id,
            name: newTask.name,
            description: newTask.description,
            isFinished: newTask.isFinished
        });
    
    }catch(error) {
        console.error('Error creating task', error);
        res.status(401).json({ message: 'Server error creating task'});
    }
}