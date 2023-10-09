/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Todo {
  id: string;
  @Prop({ required: true })
  public title: string;
  @Prop({ required: true })
  public description: string;
  @Prop()
  public done: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
