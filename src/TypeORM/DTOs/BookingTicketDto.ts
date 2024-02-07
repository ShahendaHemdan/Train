// booking.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BookingDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    tripId: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    seatNumber: number;
}
