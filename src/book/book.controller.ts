import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Delete,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './interfaces/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Put()
  async insertBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @Get(':id')
  async getOneBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }

  @Get('/author/:authorId')
  async findBooksByAuthor(
    @Param('authorId') authorId: string,
  ): Promise<Book[]> {
    return this.bookService.findBooksByAuthor(authorId);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    if (!Object.keys(updateBookDto).length) {
      throw new BadRequestException('Need 1 parameter');
    }
    return this.bookService.updateBook(id, updateBookDto);
  }
}
