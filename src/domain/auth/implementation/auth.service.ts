import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../users/infra/repository/user.repository';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const existing = await this.userRepository.findByEmail(dto.email);
        if (existing) throw new ConflictException('Email já cadastrado');

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.userRepository.create({
            username: dto.username,
            email: dto.email,
            password: hashed,
        });

        const { password: _, ...result } = user;
        return result;
    }

    async login(dto: LoginDto) {
        const user = await this.userRepository.findByEmailWithPassword(dto.email);
        if (!user) throw new UnauthorizedException('Credenciais inválidas');

        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) throw new UnauthorizedException('Credenciais inválidas');

        const payload = { sub: user.id, email: user.email, username: user.username };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user.id, username: user.username, email: user.email },
        };
    }
}