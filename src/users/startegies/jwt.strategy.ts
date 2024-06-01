import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'abc123',
        });
    }

    validate(payload: any) {
        return payload;
    }

    // private static extractJwt(req:Request):string |null{
    //     console.log(req.cookies);
    //     if (
    //         req.cookies &&
    //         'user_token' in req.cookies &&
    //         req.cookies.user_token.length > 0
    //       ) {
    //         return req.cookies.user_token;
    //       }
    //       return null;
    // }
}