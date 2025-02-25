import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../ormconfig";
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const userRepository = AppDataSource.getRepository(User);

export const protect= async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded : any = jwt.verify(token, process.env.JWT_SECRET as string);

            const user = await userRepository.findOne({ where: { id: decoded.id } });

            if(!user) {
                return res.status(401).json({ message: 'User not found'})
            }

            req.user = user;
            next();
        }catch(error) {
            return res.status(401).json({ message : 'Invalid token'})
        }
    } else {
        return res.status(401).json({message: 'No Token, authorization denied'})
    }
}
