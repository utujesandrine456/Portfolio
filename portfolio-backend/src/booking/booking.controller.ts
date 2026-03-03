import { Controller, Post, Body } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDTO } from './dto/booking.dto';

@Controller('booking')
export class BookingController {
    constructor(private bookingService: BookingService){}

    @Post()
    createBooking(@Body() dto: BookingDTO){
        return this.bookingService.createBooking(dto);
    }
}
