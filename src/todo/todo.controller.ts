import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './models/todo.model';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos() {
    return await this.todoService.getTodos();
  }

  @Post()
  async insertTodo(@Body() todo: Todo) {
    return await this.todoService.insertTodo(todo);
  }

  @Put()
  async updateTodo(@Body() todo: Todo) {
    return await this.todoService.updateTodo(todo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    return await this.todoService.deleteTodo(id);
  }
}
