import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDTO } from './dto/contact.dto';


@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService){}

    @Post()
    sendMessage(@Body() dto: ContactDTO){
        return this.contactService.sendContactEmail(dto);
    }
}
