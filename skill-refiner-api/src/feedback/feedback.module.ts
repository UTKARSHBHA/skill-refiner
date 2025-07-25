import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [FeedbackService],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
