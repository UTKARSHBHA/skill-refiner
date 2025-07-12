import { PrismaService } from 'src/prisma/prisma.service';
export declare class FeedbackService {
    private prisma;
    constructor(prisma: PrismaService);
    private openai;
    generateFeedback(taskId: number): Promise<{
        message: string;
        feedback: {
            id: number;
            taskId: number;
            content: string;
            createdAt: Date;
        };
    }>;
}
