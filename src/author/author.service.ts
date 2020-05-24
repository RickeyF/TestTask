import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './interfaces/author.interface';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { BookService } from './../book/book.service';

@Injectable()
export class AuthorService {
  constructor(
    @Inject(forwardRef(() => BookService))
    private bookService: BookService,
    @InjectModel('Author') private authorModel: Model<Author>,
  ) {}

  async create(authorDto: CreateAuthorDto): Promise<Author> {
    return new this.authorModel(authorDto)
      .save()
      .then(author => author)
      .catch(error => {
        throw new InternalServerErrorException(
          `Error to create author: ${error}!`,
        );
      });
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<Author> {
    return this.authorModel.findById(id).then(author => {
      if (!author)
        throw new NotFoundException(`Author with id ${id} not found!`);

      return author;
    });
  }

  async updateAuthor(id: string, authorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);

    if (authorDto.firstName) {
      author.firstName = authorDto.firstName;
    }
    if (authorDto.lastName) {
      author.lastName = authorDto.lastName;
    }
    if (authorDto.birthday) {
      author.birthday = authorDto.birthday;
    }

    author.updatedAt = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    return author
      .save()
      .then(author => author)
      .catch(error => {
        throw new InternalServerErrorException(
          `Error to update author: ${error}!`,
        );
      });
  }

  async deleteAuthor(id: string) {
    return this.findOne(id).then(() => {
      this.authorModel
        .deleteOne({ _id: id })
        .exec()
        .catch(error => {
          throw new InternalServerErrorException(
            `Error to delete author: ${error}!`,
          );
        });
    });
  }
}
