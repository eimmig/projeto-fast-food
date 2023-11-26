import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../model/usuario.model';
import { JwtService } from '@nestjs/jwt';
import { GenericService } from './GenericService';
import * as validator from 'validator';
import * as cpfValidator from 'cpf-cnpj-validator';


@Injectable()
export class UsuarioService extends GenericService<Usuario> { 
  constructor(
    @InjectRepository(Usuario)
    private readonly userRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {
    super(Usuario, userRepository)
  }

  async authenticateUser(credentials: { email: string; senha: string }): Promise<string> {
    const user = await this.userRepository.findOneBy({ email: credentials.email });

    if (user && user.senha === credentials.senha) {
      const payload = { email: user.email, sub: user.id };
      return this.jwtService.sign(payload);
    }

    return null;
  }

  async validateUserByJwt(token: string): Promise<Usuario> {
    const decoded = this.jwtService.verify(token);
    return this.userRepository.findOne(decoded.sub);
  }

  validarCpf(cpf: string): boolean {

    const iscnpjValid = cpfValidator.cnpj.isValid(cpf);
    const iscpfValid = cpfValidator.cpf.isValid(cpf);
    
    return iscnpjValid || iscpfValid;

  }

  validarEmail(email: string): boolean {
    return validator.isEmail(email);
  }

  async validarEmailExistente(email: string): Promise<boolean> { 
    const user = await this.  userRepository.findOneBy({ email: email });
    return user ? true : false;
  }
}
