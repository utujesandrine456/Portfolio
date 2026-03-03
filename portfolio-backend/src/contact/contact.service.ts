import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ContactDTO } from './dto/contact.dto'; 

@Injectable()
export class ContactService {
    constructor(private mailerService: MailerService){}

    async sendContactEmail(data: ContactDTO){

        await this.mailerService.sendMail({
            to: process.env.EMAIL_USER,
            from: data.email,
            subject: `Portfolio Message Form: ${data.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding:20px; background:#f4f6f9;">
                    <div style="max-width:600px; margin:auto; background:white; padding:25px; 
                                border-radius:10px; box-shadow:0px 0px 10px rgba(0,0,0,0.1);">

                        <h2 style="color:#2563eb; text-align:center;">
                            New Portfolio Message
                        </h2>

                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Email:</strong> ${data.email}</p>

                        <div style="margin-top:20px;">
                            <h3 style="color:#333;">Message:</h3>
                            <p style="background:#f8fafc; padding:15px; border-radius:8px;">
                                ${data.message}
                            </p>
                        </div>

                        <hr style="margin-top:25px;">
                        <p style="text-align:center; color:gray; font-size:12px;">
                            Portfolio Contact System
                        </p>
                    </div>
                </div>
            `
        });

        return { message: "Email sent successfully" };
    }
}