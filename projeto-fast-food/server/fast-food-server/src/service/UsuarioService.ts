import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
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
    super(userRepository)
  }

  async authenticateUser(credentials: { email: string; senha: string }): Promise<[string, Usuario]> {
    const user = await this.userRepository.findOne({
      where: { email: credentials.email },
      relations: ['endereco'],
    });

    if (user && user.senha === credentials.senha) {
      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);
      return [token, user];
    }

    return null;
  }

  async validateUserByJwt(token: string): Promise<Boolean> {
    let decoded = null
    try {
      decoded = this.jwtService.verify(token);
    } catch (error) {

    }
    return decoded ? true : false;
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

  getCompanies() {
    return this.userRepository.find({
      where: {
        cpf_cnpj: Raw(alias => `${alias} IS NOT NULL AND LENGTH(${alias}) >= 15`), 
      },
    });
  } 

  async getById(id: number): Promise<Usuario | undefined> {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['endereco'],
    });
  }

  async update(id: string | number, updatedItem): Promise<void> {
    const user = await this.userRepository.findOneById(id);
    user.email = updatedItem.email;
    user.nome = updatedItem.name;
    user.telefone = updatedItem.telefone;

    await this.userRepository.update(id, user);
  }

}
