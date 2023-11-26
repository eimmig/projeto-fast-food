import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericService } from './GenericService';
import { Categoria } from 'src/model/categoria.model';

@Injectable()
export class CategoriaService extends GenericService<Categoria> { 
  constructor(
    @InjectRepository(Categoria)
    private readonly pedidoRepository: Repository<Categoria>,
  ) {
    super(pedidoRepository)
  }
}
