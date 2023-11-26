import { Controller } from '@nestjs/common';
import { EnderecoService } from 'src/service/EnderecoService';
import { GenericController } from './GenericController';
import { Endereco } from 'src/model/endereco.model';

@Controller('endereco')
export class  CategoriaController extends GenericController<Endereco> {
  constructor(private readonly enderecoService: EnderecoService) {
    super(enderecoService);
  }
}