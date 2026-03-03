import { Injectable } from '@nestjs/common';
import { BookingDTO } from './dto/booking.dto';
import {PrismaService} from 'src/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService, private mailerService: MailerService){}

    async createBooking(data: BookingDTO){
        const exists = await this.prisma.booking.findFirst({
 where: {
   date: data.date,
   time: data.time
 }
});

        if(exists){
            throw new Error("Time slot already booked");
        }

        const booking = await this.prisma.booking.create({
            data:{
                name: data.name,
                email: data.email,
                date: data.date,
                time: data.time,
                meetingType: data.meetingType
            }
        });

        await this.mailerService.sendMail({
            to: data.email,
            subject: "Booking Confirmation",
            html: `
                <div style="font-family: Arial; padding:20px;">
                    <h2 style="color:#2563eb">Your Session is Confirmed</h2>

                    <p>Hi <b>${data.name}</b>,</p>

                    <p>Your session has been successfully booked.</p>

                    <h3>Session Details</h3>

                    <ul>
                        <li><b>Date:</b> ${data.date}</li>
                        <li><b>Time:</b> ${data.time}</li>
                        <li><b>Meeting Type:</b> ${data.meetingType}</li>
                    </ul>

                    <p>We look forward to meeting you</p>
                </div>
            `
        })

        await this.mailerService.sendMail({
            to: process.env.EMAIL_USER,
            subject: "New Booking Received",
            html: `
                <h2>New Booking Notification</h2>

                <p><b>Name:</b> ${data.name}</p>
                <p><b>Email:</b> ${data.email}</p>
                <p><b>Date:</b> ${data.date}</p>
                <p><b>Time:</b> ${data.time}</p>
                <p><b>Type:</b> ${data.meetingType}</p>
            `
        })

        return {message: "Session Booked Sucessfully"}

    }
}
