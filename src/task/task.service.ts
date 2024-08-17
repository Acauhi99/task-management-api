import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TaskDto, TaskStatusEnum } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(newTask: TaskDto) {
    newTask.id = uuid();
    newTask.status = TaskStatusEnum.OPEN;
    this.tasks.push(newTask);
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((task) => task.id === id);

    if (!foundTask.length) {
      throw new HttpException(
        `Task with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return foundTask[0];
  }

  findAll(params: { title: string; status: string }): TaskDto[] {
    return this.tasks.filter((task) => {
      if (params.title && !task.title.includes(params.title)) {
        return false;
      }

      if (params.status && !task.status.includes(params.status)) {
        return false;
      }

      return true;
    });
  }

  update(task: TaskDto) {
    const taskId = this.tasks.findIndex((t) => t.id === task.id);

    if (taskId < 0) {
      throw new HttpException(
        `Task with ID ${task.id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    this.tasks[taskId] = task;
  }

  remove(id: string) {
    const taskId = this.tasks.findIndex((t) => t.id === id);

    if (taskId < 0) {
      throw new HttpException(
        `Task with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.tasks.splice(taskId, 1);
  }
}
