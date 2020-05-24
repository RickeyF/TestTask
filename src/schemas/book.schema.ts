import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  iban: Number,
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date,
});
