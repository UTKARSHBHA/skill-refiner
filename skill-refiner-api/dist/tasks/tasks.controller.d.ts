import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FeedbackService } from 'src/feedback/feedback.service';
import { File } from 'multer';
export declare class TasksController {
    private readonly tasksService;
    private readonly feedbackService;
    constructor(tasksService: TasksService, feedbackService: FeedbackService);
    create(createTaskDto: CreateTaskDto): Promise<{
        id: number;
        title: string;
        content: string;
        userEmail: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: number;
        title: string;
        content: string;
        userEmail: string;
        createdAt: Date;
    }[]>;
    getTask(id: number): Promise<({
        feedbacks: {
            id: number;
            content: string;
            createdAt: Date;
            taskId: number;
        }[];
    } & {
        id: number;
        title: string;
        content: string;
        userEmail: string;
        createdAt: Date;
    }) | null>;
    uploadResume(file: File, userEmail: string): Promise<{
        task: {
            id: number;
            title: string;
            content: string;
            userEmail: string;
            createdAt: Date;
        };
        feedback: {
            id: number;
            content: string;
            createdAt: Date;
            taskId: number;
        };
    }>;
}
