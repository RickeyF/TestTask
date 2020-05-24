import * as mongoose from 'mongoose';

export interface Author extends mongoose.Document {
  id: number;
  firstName: string;
  lastName: string;
  birthday: Date;
  createdAt: Date;
  updatedAt: Date;
}
