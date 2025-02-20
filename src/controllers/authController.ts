import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { AppDataSource } from "../../ormconfig";
import { User } from '../entities/User';
import { generateToken } from "../utils/generateToken";

const userRepository = AppDataSource.getRepository(User);

//Register User
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password} = req.body;

    try{
        const existingUser = await userRepository.findOne( {where: { email }});
        if(existingUser) {
            return res.status(400).json({ message : 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = userRepository.create( {name, email, password: hashedPassword})

        await userRepository.save(newUser);

        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser.id)
        })

    }catch(error){
        res.status(500).json({ message: 'Server error'})    
    }
}

//Login user
export const loginUser = async (req: Request, res:Response) => {
    const { email, password} = req.body;

    try{
        const user = await userRepository.findOne({where: { email } })
        if(!user){
            return res.status(401).json({ message: 'Email does not exist'})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(401).json({ message: 'Wrong password'})
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }catch(error){
        res.status(500).json({ message: 'Server error '})
    }
}