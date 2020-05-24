import { Model } from 'mongoose';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthorService } from './../author/author.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @Inject(forwardRef(() => AuthorService))
    private authorService: AuthorService,
    @InjectModel('Book') private bookModel: Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async create(bookDto: CreateBookDto): Promise<Book> {
    return this.authorService.findOne(bookDto.author).then(() =>
      new this.bookModel({
        ...bookDto,
        iban: `MD${Math.floor(
          Math.random() * 8888888888888888888889 + 1111111111111111111111,
        )}`,
      })
        .save()
        .then(book => book)
        .catch(error => {
          throw new InternalServerErrorException(
            `Error to add book: ${error}!`,
          );
        }),
    );
  }

  async findOne(id: string): Promise<Book> {
    return this.bookModel.findById(id).then(book => {
      if (!book) throw new NotFoundException(`Book with id ${id} not found!`);

      return book;
    });
  }

  async deleteBook(id: string) {
    return this.findOne(id).then(() => {
      this.bookModel
        .deleteOne({ _id: id })
        .exec()
        .catch(error => {
          throw new InternalServerErrorException(
            `Error to delete book: ${error}!`,
          );
        });
    });
  }

  async findBooksByAuthor(authorId: string): Promise<Book[]> {
    return this.bookModel
      .find({ author: authorId })
      .exec()
      .then(books => books)
      .catch(() => {
        throw new NotFoundException(
          `Not found any book by author ID ${authorId}!`,
        );
      });
  }

  async updateBook(id: string, bookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (bookDto.publishedAt) {
      book.publishedAt = bookDto.publishedAt;
    }
    if (bookDto.iban) {
      book.iban = bookDto.iban;
    }
    if (bookDto.title) {
      book.title = bookDto.title;
    }
    if (bookDto.author) {
      await this.authorService
        .findOne(bookDto.author)
        .then(() => (book.author = bookDto.author));

      book.author = bookDto.author;
    }

    book.updatedAt = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    return book
      .save()
      .then(book => book)
      .catch(error => {
        throw new InternalServerErrorException(
          `Error to update book: ${error}!`,
        );
      });
  }
}
