import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto): Promise<{
        title: string;
        content: string;
        userEmail: string;
        id: number;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        title: string;
        content: string;
        userEmail: string;
        id: number;
        createdAt: Date;
    }[]>;
    getTaskById(id: number): Promise<({
        feedbacks: {
            content: string;
            id: number;
            createdAt: Date;
            taskId: number;
        }[];
    } & {
        title: string;
        content: string;
        userEmail: string;
        id: number;
        createdAt: Date;
    }) | null>;
    createTask(data: {
        title: string;
        content: string;
        userEmail: string;
    }): Promise<{
        title: string;
        content: string;
        userEmail: string;
        id: number;
        createdAt: Date;
    }>;
}
