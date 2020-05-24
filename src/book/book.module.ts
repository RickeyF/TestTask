import { Module, forwardRef } from '@nestjs/common';
import { BookService } from './book.service';
import { BookSchema } from './schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { AuthorModule } from './../author/author.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    forwardRef(() => AuthorModule),
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
