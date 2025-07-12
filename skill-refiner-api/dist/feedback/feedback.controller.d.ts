import { FeedbackService } from './feedback.service';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    generate(taskId: number): Promise<{
        message: string;
        feedback: {
            id: number;
            taskId: number;
            content: string;
            createdAt: Date;
        };
    }>;
    retryFeedback(taskId: number): Promise<{
        message: string;
        feedback: {
            id: number;
            taskId: number;
            content: string;
            createdAt: Date;
        };
    }>;
}
