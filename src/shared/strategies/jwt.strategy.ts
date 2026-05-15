import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getEnv } from '../utils/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: getEnv('JWT_SECRET'),
        });
    }

    async validate(payload: { sub: number; email: string; username: string }) {
        return { id: payload.sub, email: payload.email, username: payload.username };
    }
}
