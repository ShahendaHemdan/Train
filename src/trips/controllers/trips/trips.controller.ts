/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Trip } from 'src/TypeORM/entities/Trip';
import { TripsService } from 'src/trips/services/trips/trips.service';
import { Response } from 'express';
import { TripDTO } from 'src/TypeORM/DTOs/TripDto';
import { OnEvent } from '@nestjs/event-emitter';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('trips')
export class TripsController {
    private delayAdded = false;
    constructor(private tripService: TripsService,
    ) { }

    @OnEvent('Delay Added')
    handleTrips() {
        this.delayAdded = true;
    }


    @Get()
    async getAllTrips(@Res() res: Response) {
    
        const trips = await this.tripService.findAllTrips();
      

        if (trips[0]) {
            const tripDTO = trips.map((trip) => TripDTO.createFromEntity(trip));
            res.status(200).json({ Status: HttpStatus.OK, Data: tripDTO });
        } else {
            throw new HttpException('There are no Trips', HttpStatus.NOT_FOUND);
        }

    }

   
    @Get("sse")
    async getAllTripsSse(@Res() res: Response) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const sendEvent = (data: any) => {
            res.write(`data: ${JSON.stringify(data)}\n\n`);
        };




        // Send initial data
        const trips = await this.tripService.findAllTrips();
        if (trips[0]) {
            const tripDTO = trips.map((trip) => TripDTO.createFromEntity(trip));
            sendEvent({ Status: HttpStatus.OK, Data: tripDTO });
        } else {
            throw new HttpException('There are no Trips', HttpStatus.NOT_FOUND);
        }



        // Keep the connection open
        const intervalId = setInterval(async () => {
            if (this.delayAdded) {
                const updatedTrips = await this.tripService.findAllTrips();
                if (updatedTrips[0]) {
                    const updatedTripDTO = updatedTrips.map((trip) => TripDTO.createFromEntity(trip));
                    sendEvent({ Status: HttpStatus.OK, Data: updatedTripDTO, Updated: true });
                    this.delayAdded = false; // Reset the flag after sending the update
                }
            }
        }, 5000); // Update every 5 seconds


        // Handle client disconnect
        res.on('close', () => {
            clearInterval(intervalId);
        });

    }


    @Get(':id')
    async getTripById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const trip = await this.tripService.findTripById(id);
        if (trip) {
            const tripDTO = TripDTO.createFromEntity(trip);
            return res.status(200).json({ status: HttpStatus.OK, data: tripDTO });

        } else {
            return res.status(404).json({ status: HttpStatus.NOT_FOUND, msg: "Trip Not Found" });

        }
    }


    @Post('create')
    @UsePipes(ValidationPipe)
    async createTrip(@Body() tripData: Trip,@Body('trainId') trainId: number, @Res() res: Response) {
        const trip = this.tripService.createTripWithDetails(trainId, tripData);
        if (trip) {
            return res.status(201).json({ status: HttpStatus.CREATED, msg: "Trip Saved Successflly" });

        } else {
            return res.status(400).json({ status: HttpStatus.BAD_REQUEST, msg: "Trip Not Saved" });

        }
    }


    @Put(':id')
    @UsePipes(ValidationPipe)
    async updateTrip(@Param('id', ParseIntPipe) id: number,
        @Body() tripDetails: Trip,
        @Res() res: Response) {

        const updatedTrip = await this.tripService.updateTrip(id, tripDetails);

        if (updatedTrip.affected) {
            return res.status(201).json({ status: HttpStatus.CREATED, data: "Trip Updated Successflly" });
        } else {
            return res.status(400).json({ status: HttpStatus.BAD_REQUEST, msg: "Trip Not Updated" });

        }
    }

    @Delete(':id')
    async deletTrip(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const deletedTrip = await this.tripService.deleteTrip(id);
        if (deletedTrip.affected) {
            return res.status(200).json({ Status: HttpStatus.OK, Data: "Trip Deleted Successflly" });
        } else {
            return res.status(404).json({ status: HttpStatus.NOT_FOUND, msg: "There is no such Trip" });
        }
    }






}





