import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { log } from 'console';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    log(this.tasks);
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
    log(this.tasks);
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
    log(this.tasks);
  }
}
