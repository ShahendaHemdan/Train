import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { DelayDTO } from 'src/TypeORM/DTOs/DelayDto';
import { DelaysService } from 'src/delays/services/delays/delays.service';
import { Response } from 'express';
import { Delay } from 'src/TypeORM/entities/Delay';
import { TripsService } from 'src/trips/services/trips/trips.service';
import { StationsService } from 'src/stations/services/stations/stations.service';
import { GetDelayDto } from 'src/TypeORM/DTOs/GetDelayDto';
import { Role } from 'src/decorators/roles.decorator';
import { AuthurizationGuard } from 'src/guards/Authorization.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Role('admin')
@UseGuards(JwtAuthGuard, AuthurizationGuard)
@Controller('delays')
export class DelaysController {
    constructor(private delayService: DelaysService,
        private tripsService: TripsService,
        private stationsService: StationsService,



    ) { }

    @Get()
    async getAllDelays(@Res() res: Response) {
        const delays = await this.delayService.findAllDelays();

        if (delays[0]) {
            //Map Station Obj To Dto
            const delayDto = delays.map(delay => GetDelayDto.createFromEntity(delay));
            return res.json({ Status: HttpStatus.OK, Data: delayDto });
        } else {
            throw new HttpException('There are no delays', HttpStatus.NOT_FOUND);
        }
    }


    @Get(':id')
    async getDelayById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const delay = await this.delayService.findDelayById(id);
        if (delay) {
            //Map Station Obj To Dto
            const delayDto = GetDelayDto.createFromEntity(delay);
            return res.json({ Status: HttpStatus.OK, Data: delayDto });
        } else {
            throw new HttpException('Delay Not Found', HttpStatus.NOT_FOUND);
        }
    }


    @Post()
    async createDelay(@Body() DelayDetails: DelayDTO, @Res() res: Response) {

        const { tripId, stationId } = DelayDetails;
        const trip = await this.tripsService.findTripById(tripId);
        const station = await this.stationsService.findStationById(stationId);
        if (!trip || !station) {
            throw new HttpException('Error not found', HttpStatus.NOT_FOUND);
        } else {

            const delay = this.delayService.createDelaytWithDetails(DelayDetails);
            if (delay) {
                return res.json({ Status: HttpStatus.CREATED, Data: "Delay Added Successfully" })
            } else {
                throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
            }
        }
    }


    @Put(':id')
    @UsePipes(ValidationPipe)
    async updateDelay(@Param('id', ParseIntPipe) id: number, @Body() delayData: Delay, @Res() res: Response) {

        const updatedDelay = await this.delayService.updateDelay(id, delayData);
        if (updatedDelay) {
            return res.json({ Status: HttpStatus.CREATED, Data: "Delay Updated Successfully" })

        } else {
            throw new HttpException('Delay Not Updated', HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async deletDelay(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const deletedDelay = await this.delayService.deleteDelay(id);
        if (deletedDelay.affected) {
            return res.json({ Status: HttpStatus.OK, Data: "Delay Deleted Successfully" })

        } else {
            throw new HttpException('There is no such Delay', HttpStatus.NOT_FOUND);
        }
    }








}





