import { IsString, MaxLength, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateAuthorDto {
  @IsDateString()
  birthday: Date;

  @IsNotEmpty()
  @MaxLength(50, {
    message:
      'First name is too long. Maximal length is $constraint1 characters!',
  })
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @MaxLength(50, {
    message:
      'Last name is too long. Maximal length is $constraint1 characters!',
  })
  @IsString()
  lastName: string;
}
