"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const platform_express_1 = require("@nestjs/platform-express");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const feedback_service_1 = require("../feedback/feedback.service");
const multer_1 = require("multer");
let TasksController = class TasksController {
    tasksService;
    feedbackService;
    constructor(tasksService, feedbackService) {
        this.tasksService = tasksService;
        this.feedbackService = feedbackService;
    }
    create(createTaskDto) {
        return this.tasksService.create(createTaskDto);
    }
    findAll() {
        return this.tasksService.findAll();
    }
    getTask(id) {
        return this.tasksService.getTaskById(id);
    }
    async uploadResume(file, userEmail) {
        if (!file || !file.buffer) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        const buffer = file.buffer;
        let text = '';
        if (file.mimetype === 'application/pdf') {
            const data = await pdfParse(buffer);
            text = data.text;
        }
        else if (file.mimetype ===
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const result = await mammoth.extractRawText({ buffer });
            text = result.value;
        }
        else {
            throw new common_1.BadRequestException('Unsupported file type');
        }
        const task = await this.tasksService.createTask({
            title: file.originalname,
            content: text,
            userEmail: userEmail || 'anonymous@demo.com',
        });
        const feedback = await this.feedbackService.generateFeedback(task.id);
        return {
            task,
            feedback: feedback.feedback,
        };
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "getTask", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof multer_1.File !== "undefined" && multer_1.File) === "function" ? _a : Object, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "uploadResume", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [tasks_service_1.TasksService,
        feedback_service_1.FeedbackService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map