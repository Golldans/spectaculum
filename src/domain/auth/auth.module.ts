import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getEnv } from '../../shared/utils/env';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { AuthService } from './implementation/auth.service';
import { AuthController } from './presentation/auth.controller';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: getEnv('JWT_SECRET'),
                signOptions: { expiresIn: '7d' },
            }),
        }),
        UsersModule,
    ],
    providers: [AuthService, JwtStrategy],
    exports: [JwtModule],
    controllers: [AuthController],
})
export class AuthModule {}
