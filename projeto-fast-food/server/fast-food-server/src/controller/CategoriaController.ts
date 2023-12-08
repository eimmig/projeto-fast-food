import { Controller, Get } from '@nestjs/common';
import { CategoriaService } from 'src/service/CategoriaService';
import { GenericController } from './GenericController';
import { Categoria } from 'src/model/categoria.model';

@Controller('category')
export class  CategoriaController extends GenericController<Categoria> {
  constructor(private readonly categoriaService: CategoriaService) {
    super(categoriaService);
  }
}