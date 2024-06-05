import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from 'src/TypeORM/entities/Route';
import { Trip } from 'src/TypeORM/entities/Trip';
import { Repository } from 'typeorm';

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        @InjectRepository(Trip) private tripRepository:Repository<Trip>
      ) {}
    
      async findAll() {
        return this.routeRepository.find({ relations: ["station1", "station2", "station3", "station4"] });
      }
    
      async findById(id: number) {
        return this.routeRepository.findOne({ where: { id },  relations: ["station1", "station2", "station3", "station4"]});
    }

    
      async create(routeData: Partial<Route>){
        const route = this.routeRepository.create(routeData);
        return this.routeRepository.save(route);
      }
    
      async update(id: number, routeData: Partial<Route>){
        const updatedRoute=await this.routeRepository.update(id, routeData);
        return updatedRoute;
      }
    
      async delete(id: number){
        return this.routeRepository.delete(id);
      }


      // async findByTripId(id: number): Promise<Route> {
      //   const trip = await this.tripRepository.findOne({ where: { id }, relations: ['route',"route.station1", "route.station2", "route.station3", "route.station4"] });
      //   return trip.route;
      // }
}
