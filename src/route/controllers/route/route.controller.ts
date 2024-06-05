import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { RouteService } from 'src/route/services/route/route.service';
import { Route } from 'src/TypeORM/entities/Route';
import { Response } from 'express';

@Controller('route')
export class RouteController {
    constructor(private readonly routeService: RouteService) { }

    @Get()
    async getAllRoutes(@Res() res:Response) {
        const routes=await this.routeService.findAll();
        if (routes[0]) {
            return res.status(200).json({status:HttpStatus.OK,data:routes})
        } else {
            return res.status(404).json({status:HttpStatus.NOT_FOUND,msg:'There are no Routes'})
        }
    }

    @Get(':id')
    async getRouteById(@Param('id') id: number,@Res() res:Response) {
        const route=await this.routeService.findById(id);
        if (route) {
            return res.status(200).json({status:HttpStatus.OK,data:route})
        } else {
            return res.status(404).json({status:HttpStatus.NOT_FOUND,msg:'There are no such Route'})
        }
    }

    @Post()
    async createRoute(@Body() routeData: Partial<Route>, @Res() res:Response
) {
        const route= await this.routeService.create(routeData);
        if (route) {
            return res.status(200).json({status:HttpStatus.OK,msg:'Route Added Successfully'})
        } else {
            return res.status(404).json({status:HttpStatus.NOT_FOUND,msg:'Something went wrong'})
        }
    }

    @Put(':id')
    async updateRoute(
        @Param('id') id: number,
        @Body() routeData: Partial<Route>,
        @Res() res:Response
    ) {
        const updatedRoute=await this.routeService.update(id, routeData);
    
        if (updatedRoute) {
            return res.status(200).json({status:HttpStatus.OK,msg:'Route Updated Successfully'})
        } else {
            return res.status(404).json({status:HttpStatus.NOT_FOUND,msg:'Something went wrong'})
        }
    }

    @Delete(':id')
    async deleteRoute(@Param('id') id: number,@Res() res:Response) {
        const deltedRoute=await this.routeService.delete(id);
        if (deltedRoute) {
            return res.status(200).json({status:HttpStatus.OK,msg:'Route deleted Successfully'})
        } else {
            return res.status(404).json({status:HttpStatus.NOT_FOUND,msg:'Something went wrong'})
        }
    }

    

    // @Get("/trip/:id")
    // async findByTripId(@Res() res:Response,@Param('id') id: number) {
    //     const routes=await this.routeService.findByTripId(id);
    //     if (routes) {
    //         return res.status(200).json({status:HttpStatus.OK,data:routes})
    //     } else {
    //         return res.status(404).json({status:HttpStatus.NOT_FOUND,msg:'There are no Routes'})
    //     }
    // }
}
