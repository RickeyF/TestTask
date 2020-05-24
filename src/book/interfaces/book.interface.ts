import * as mongoose from 'mongoose';

export interface Book extends mongoose.Document {
  id: number;
  title: string;
  author: string;
  iban: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
