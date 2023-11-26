import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Usuario } from 'src/model/usuario.model';
import { UsuarioService } from 'src/service/UsuarioService';
import { UsuarioController } from 'src/controller/UsuarioController';

@Module({
  imports: [
  TypeOrmModule.forFeature([Usuario]),
    JwtModule.register({
      secret: 'projeto-restaurante-fast-food-token',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class AuthModule {}
