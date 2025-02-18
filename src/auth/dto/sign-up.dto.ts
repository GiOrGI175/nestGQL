import { IsNotEmpty, IsString, Length } from 'class-validator';

export class signUpDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
