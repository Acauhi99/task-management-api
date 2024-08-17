import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { FindAllParameters, TaskDto, TaskRouterParameters } from './task.dto';
import { TaskService } from './task.service';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() task: TaskDto): Promise<TaskDto> {
    return await this.taskService.create(task);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.findById(id);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
    return await this.taskService.findAll(params);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param() param: TaskRouterParameters, @Body() task: TaskDto) {
    task.id = param.id;
    return await this.taskService.update(task);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.taskService.remove(id);
  }
}
