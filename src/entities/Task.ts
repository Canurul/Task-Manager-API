import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn} from "typeorm";
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

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
} 