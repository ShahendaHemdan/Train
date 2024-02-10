import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role_Key } from 'src/decorators/roles.decorator';

@Injectable()
export class AuthurizationGuard implements CanActivate  {
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request=context.switchToHttp().getRequest();
        const RequiredRole=this.reflector.getAllAndOverride(Role_Key,[context.getClass(),context.getHandler()]);

        const UserRole=request.user.role;
        if(RequiredRole!== UserRole){
            return false;
        }
        return true;
    }
}