import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  iban: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
