import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './models/todo.model';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Talentclass-Todo') private readonly todoModel: Model<Todo>,
  ) {}

  async insertTodo(todo: Todo) {
    const newTodo = new this.todoModel(todo);
    const result = await newTodo.save();

    return {
      id: result.id,
      title: result.title,
      description: result.description,
      done: result.done,
    };
  }

  async updateTodo(todo: Todo) {
    let result;
    try {
      result = await this.todoModel.updateOne({ _id: todo.id }, todo);

      if (result && result.matchedCount > 0) {
        result = await this.todoModel.findById(todo.id);
      } else {
        throw new NotFoundException('Cannot find the todo with id: ' + todo.id);
      }
    } catch (err) {
      throw new NotFoundException('Cannot find the todo with id: ' + todo.id);
    }

    return {
      id: result.id,
      title: result.title,
      description: result.description,
      done: result.done,
    };
  }

  async getTodos() {
    try {
      const result = await this.todoModel.find().exec();

      return result.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        done: todo.done,
      }));
    } catch (err) {
      console.log(err);
    }
  }

  async deleteTodo(id: string) {
    let result;
    try {
      result = await this.todoModel.deleteOne({ _id: id });
    } catch (err) {
      throw new NotFoundException('Cannot find todo with id: ' + id);
    }

    return result;
  }
}
