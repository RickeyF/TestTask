import { IsString, MaxLength, IsDateString, IsOptional } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @MaxLength(50, {
    message:
      'First name is too long. Maximal length is $constraint1 characters!',
  })
  @IsString()
  firstName: string;

  @IsOptional()
  @MaxLength(50, {
    message:
      'Last name is too long. Maximal length is $constraint1 characters!',
  })
  @IsString()
  lastName: string;

  @IsOptional()
  @IsDateString()
  birthday: Date;
}
