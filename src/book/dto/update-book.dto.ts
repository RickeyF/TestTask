import {
  IsString,
  MaxLength,
  IsDateString,
  IsOptional,
  IsNotEmpty,
  IsIBAN,
} from 'class-validator';

export class UpdateBookDto {
  @IsDateString()
  @IsOptional()
  publishedAt: Date;

  @IsNotEmpty()
  @MaxLength(50, {
    message:
      'Title name is too long. Maximal length is $constraint1 characters!',
  })
  @IsOptional()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  author: string;

  @IsIBAN()
  @IsOptional()
  iban: string;
}
