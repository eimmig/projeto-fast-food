import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericService } from './GenericService';
import { Endereco } from 'src/model/endereco.model';
import { Usuario } from 'src/model/usuario.model';

@Injectable()
export class EnderecoService extends GenericService<Endereco> { 
  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {
    super(enderecoRepository)
  }

  async save(endereco: any): Promise<Endereco> { 
    const newEndereco = new Endereco();
    newEndereco.cep = endereco.cep;
    newEndereco.rua = endereco.street;
    newEndereco.numero = endereco.number;
    newEndereco.complemento = endereco.complement;
    newEndereco.bairro = endereco.neighbourhood;
    newEndereco.cidade = endereco.city;
    newEndereco.estado = endereco.state;
    newEndereco.usuario = await this.usuarioRepository.findOneById(endereco.userId)
    return await this.enderecoRepository.save(newEndereco);
  }

  async update(id: string | number, updatedItem): Promise<void> { 
    const usuario = await this.usuarioRepository.findOneById(updatedItem.userId);
    const newEndereco = await this.enderecoRepository.findOneById(id)
    newEndereco.cep = updatedItem.cep;
    newEndereco.rua = updatedItem.street;
    newEndereco.numero = updatedItem.number;
    newEndereco.complemento = updatedItem.complement;
    newEndereco.bairro = updatedItem.neighbourhood;
    newEndereco.cidade = updatedItem.city;
    newEndereco.estado = updatedItem.state;
    newEndereco.usuario = usuario
    await this.enderecoRepository.save(newEndereco);

    usuario.endereco = newEndereco;
    await this.usuarioRepository.save(usuario);
  }
}
