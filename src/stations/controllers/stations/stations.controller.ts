import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { StationsService } from 'src/stations/services/stations/stations.service';
import { Response } from 'express';
import { Station } from 'src/TypeORM/entities/Station';
import { Role } from 'src/decorators/roles.decorator';
import { AuthurizationGuard } from 'src/guards/Authorization.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Role('admin')
@UseGuards(JwtAuthGuard,AuthurizationGuard)
@Controller('stations')
export class StationsController {

    constructor(private stationService: StationsService) { }

    @Get()
    async getAllStations(@Res() res:Response) {
        const stations = await this.stationService.findAllStations();


        if (stations[0]) {
            return res.status(200).json({status:HttpStatus.OK,data:stations})
        } else {
            return res.status(404).json({status:HttpStatus.NOT_FOUND,msg:'There are no Stations'})
        }
    }


    @Get(':id')
    async getStationById(@Param('id', ParseIntPipe) id: number,@Res() res:Response) {
        const station = await this.stationService.findStationById(id);
        if (station[0]) {
            return res.status(200).json({status:HttpStatus.OK,data:station})
        } else {
            return res.status(404).json({status:HttpStatus.NOT_FOUND,msg:'There Is No Such Station'})
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    addStation(@Body() stationDetails: Station, @Res() res: Response) {
        const station = this.stationService.createStation(stationDetails);
        if (station) {
            return res.status(200).json({status:HttpStatus.OK, msg: "Station Added successfully" })
        } else {
            return res.status(400).json({status:HttpStatus.BAD_REQUEST,msg:'Station Not Saved'})

        }
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    async updateStation(@Param('id', ParseIntPipe) id: number, @Body() stationDetails: Station,@Res() res:Response) {
        //Get Station By Id
        const station = await this.stationService.findStationById(id);
        //Check if the  Station Exists
        if (station[0]) {
            //Update Station
            const updatedStation = await this.stationService.updateStation(id, stationDetails);

            //Check if the  Station Updated Or Not
            if (updatedStation.affected) {
                return res.status(200).json({status:HttpStatus.OK, msg: "Station Updated successfully" })

            } else {
                return res.status(400).json({status:HttpStatus.BAD_REQUEST,msg:'Station Not Updated'})

            }
        } else {
            return res.status(404).json({status:HttpStatus.BAD_REQUEST,msg:'Station Not Found'})

        }
    }

    @Delete(':id')
    async deletStation(@Param('id', ParseIntPipe) id: number,@Res() res:Response) {
        const deletedStation = await this.stationService.deleteStation(id);
        if (deletedStation.affected) {
            return res.status(200).json({status:HttpStatus.OK, msg: "Station Deleted successfully" })

        } else {
            return res.status(404).json({status:HttpStatus.BAD_REQUEST,msg:'Station Not Found'})

        }
    }

}


