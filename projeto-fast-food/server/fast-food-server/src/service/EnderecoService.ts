import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericService } from './GenericService';
import { Endereco } from 'src/model/endereco.model';

@Injectable()
export class EnderecoService extends GenericService<Endereco> { 
  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,
  ) {
    super(enderecoRepository)
  }
}
