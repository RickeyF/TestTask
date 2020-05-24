import { IsString, MaxLength, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateBookDto {
  @IsDateString()
  publishedAt: Date;

  @IsNotEmpty()
  @MaxLength(50, {
    message:
      'Title name is too long. Maximal length is $constraint1 characters!',
  })
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;
}
