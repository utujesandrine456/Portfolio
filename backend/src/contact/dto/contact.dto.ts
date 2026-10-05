import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";


export class ContactDTO {

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(10)
    @MaxLength(1000)
    message: string;
}