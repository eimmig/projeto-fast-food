import { Controller, Get, Param } from '@nestjs/common';
import { ProdutoService } from 'src/service/ProdutoService';
import { GenericController } from './GenericController';
import { Produto } from 'src/model/produto.model';

@Controller('produto')
export class  ProdutoController extends GenericController<Produto> {
  constructor(private readonly produtoService: ProdutoService) {
    super(produtoService);
  }

  @Get('/getByUser/:id')
  async getByUser(@Param('id') id: string) {
    if (id == null) {
      throw new Error("ID do usuario não pode ser nulo.");
    }
    const produtos = await this.produtoService.getByUser(parseInt(id, 10));

    return { produtos };
  }
}