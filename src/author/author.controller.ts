import {
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Body,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author } from './interfaces/author.interface';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAllAuthors(): Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Put()
  async insertAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    return this.authorService.create(createAuthorDto);
  }

  @Get(':id')
  async getOneAuthor(@Param('id') id: string): Promise<Author> {
    return this.authorService.findOne(id);
  }

  @Patch(':id')
  async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    if (!Object.keys(updateAuthorDto).length) {
      throw new BadRequestException('Need 1 parameter');
    }
    return this.authorService.updateAuthor(id, updateAuthorDto);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(id);
  }
}
