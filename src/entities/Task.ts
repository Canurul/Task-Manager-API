import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, } from "typeorm";
import { User } from './User';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name: string;

    @Column()
    isFinished: boolean;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
} 