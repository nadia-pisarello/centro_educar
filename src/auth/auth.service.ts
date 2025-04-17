import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from 'src/persona/entities/persona.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Persona)
        private readonly personaRepo: Repository<Persona>,
        private readonly jwtService: JwtService
    ) { }

    async signIn(usuario: string, pass: string): Promise<{ token: string }> {
        const user =
            await this.personaRepo.findOneBy({ email: usuario }) ??
            await this.personaRepo.findOneBy({ nombre_usuario: usuario })
        if (!user || !(await bcrypt.compare(pass, user.password))) {
            throw new UnauthorizedException('Usuario o contraseña incorrectos');
        }
        const payload = {
            sub: user.dni,
            username: usuario,
            nombreCompleto: `${user.nombre} ${user.apellido}`
        }

        return { token: await this.jwtService.signAsync(payload) }
    }
}
