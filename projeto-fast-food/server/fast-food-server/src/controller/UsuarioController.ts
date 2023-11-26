import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { Usuario } from 'src/model/usuario.model';
import { UsuarioService } from 'src/service/UsuarioService';
import { GenericController } from './GenericController';

@Controller('user')
export class  UsuarioController extends GenericController<Usuario> {
  constructor(private readonly usuarioService: UsuarioService) {
    super(usuarioService);
  }


  @Post('/signup')
  async signUp(@Body() userData: any) {

    if (!this.usuarioService.validarCamposPreenchidos(userData)) { 
      return {mensagem: 'Todos os campos devem ser preenchidos!', status: false};
    }

    if (!this.usuarioService.validarCpf(userData.cpf_cnpj)) {
      return {mensagem: 'Por favor, cadastre um CPF/CNPJ valido!', status: false};
    }

    if (!this.usuarioService.validarEmail(userData.email)) {
      return {mensagem: 'Por favor, cadastre um E-mail válido!', status: false};
    }

    if (!this.usuarioService.validarEmailExistente(userData.email)) {
      return {mensagem: 'E-mail já cadastrado!', status: false};
    }

    const newUser = await this.usuarioService.save(userData);
    return {mensagem: 'Usuário cadastrado com sucesso!', status: true, usuario: newUser};
  }

  @Post('/login')
  async login(@Body() credentials: { email: string; senha: string }) {
    const token = await this.usuarioService.authenticateUser(credentials);

    if (!token) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return { token };
  }
  
}