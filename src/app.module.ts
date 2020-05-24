import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rickey:SSlmIjoCkGutlSCQ@testtask-nasz7.mongodb.net/TestTask?retryWrites=true&w=majority',
    ),
    BookModule,
    AuthorModule,
  ],
})
export class AppModule {}
