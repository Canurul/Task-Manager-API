import { AppDataSource } from "../../ormconfig";
import { Task } from "../entities/Task";
import { Request, Response } from 'express' ;
import { User } from "../entities/User";

const taskRepository = AppDataSource.getRepository(Task);

//Create a new task
export const createTask= async (req: Request, res: Response) => {

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

//Get all tasks
export const getAllTasks = async (req: Request, res:Response) => {

    try {
    const userId = (req.user as User).id

    const taskRepository = AppDataSource.getRepository(Task);
    const tasks = await taskRepository.find( {
        where: { user : { id: userId }},
        order: { createdAt: 'DESC'}
    })

    return res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
    });

    } catch (error){
        console.error('Error getting tasks', error)
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        })
    }
}

//Get single task by taskId
export const getTaskById = async (req: Request, res:  Response) => {

    try {
        const taskId = parseInt(req.params.id)

        const userId = (req.user as User).id

        if(isNaN(taskId)) {
            return res.status(400).json( {
                success: false,
                message: 'Invalid task ID'
            })
        }

        const taskRepository = AppDataSource.getRepository(Task);
        const task = await taskRepository.findOne({
            where:{
                id: taskId,
                user: {id: userId}
            }
        });

       if(!task) {
        return res.status(404).json({
            success: false,
            message: 'Task not found or you do not have permission to access it'
        })
       }
       return res.status(200).json({
        success: true,
        message:'Here is your tasks',
        data: task
       })
    } catch(error) {
        console.error('Error getting task by ID', error)
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        })

    }

}