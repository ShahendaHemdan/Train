import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UseGuards, UsePipes, ValidationPipe,Req } from '@nestjs/common';
import { TrainDTO } from 'src/TypeORM/DTOs/TrainDto';
import { TrainsService } from '../../services/trains/trains.service';
import { Response } from 'express';
import { Train } from 'src/TypeORM/entities/Train';
import { Role } from 'src/decorators/roles.decorator';
import { AuthurizationGuard } from 'src/guards/Authorization.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { Request } from 'express';
@Role('admin')
@UseGuards(JwtAuthGuard,AuthurizationGuard)
@Controller('trains')
export class TrainsController {


    constructor(private trainService: TrainsService) { }

    @Get()
    async getAllTrains(@Res() res:Response) {
        const trains = await this.trainService.findAllTrains();

        if (trains[0]) {
                        //Map Train Obj To Dto
            const trainDTOs = trains.map(train => TrainDTO.fromPlainObject(train));

            return res.json({Status:HttpStatus.OK,Data:trainDTOs});
        } else {
            throw new HttpException('There are no trains', HttpStatus.NOT_FOUND);
        }
    }


    @Get(':id')
    async getTrainById(@Param('id', ParseIntPipe) id: number,@Res() res:Response) {
        const train = await this.trainService.findTrainById(id);
        if (train[0]) {
                    //Map Train Obj To Dto
            const trainDTOs = train.map(train => TrainDTO.fromPlainObject(train));
            return res.json({Status:HttpStatus.OK,Data:trainDTOs});
        } else {
            throw new HttpException('Train Not Found', HttpStatus.NOT_FOUND);
        }
    }

    @Post('test')
    setHello(@Req() req: Request){
        // console.log(req.cookies);
    }
    @Post()
    @UsePipes(ValidationPipe)
    addTrain(@Body() trainDto: Train, @Res() res: Response) {
        const train = this.trainService.createTrain(trainDto);
        if (train) {
            return res.json({Status:HttpStatus.CREATED,Data: 'Train Added Successfully' });
        } else {
            throw new HttpException('User Not Saved', HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    async updateTrain(@Param('id', ParseIntPipe) id: number, @Body() trainDto: Train,@Res() res:Response) {

        //Get Train By Id First
        const train = await this.trainService.findTrainById(id);

        //Check if the train exists
        if (train[0]) {

            //Update Train Details
            const updatedTrain = await this.trainService.updateTrain(id, trainDto);

            //Check if the Train Is Updated Or Not 
            if (updatedTrain.affected) {
                return res.json({Status:HttpStatus.CREATED,Data: 'Train Updated Successfully' });

            } else {
                throw new HttpException('Train Not Updated', HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new HttpException('Train Not Found', HttpStatus.NOT_FOUND);
        }

    }

    @Delete(':id')
    async deletTrain(@Param('id', ParseIntPipe) id: number,@Res() res:Response) {
        const deletedTrain = await this.trainService.deleteTrain(id);
        if (deletedTrain.affected) {

            return res.json({Status:HttpStatus.OK,Data: 'Train Deleted Successfully' });

        } else {
            throw new HttpException('There is no such Train', HttpStatus.NOT_FOUND);
        }
    }

}
