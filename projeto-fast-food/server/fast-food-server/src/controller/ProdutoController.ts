import { Controller } from '@nestjs/common';
import { ProdutoService } from 'src/service/ProdutoService';
import { GenericController } from './GenericController';
import { Produto } from 'src/model/produto.model';

@Controller('produto')
export class  CategoriaController extends GenericController<Produto> {
  constructor(private readonly produtoService: ProdutoService) {
    super(produtoService);
  }
}