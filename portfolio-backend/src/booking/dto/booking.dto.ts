import { IsEmail, IsString } from "class-validator";

export class BookingDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    date: string;

    @IsString()
    time: string;

    @IsString()
    meetingType: string;
}