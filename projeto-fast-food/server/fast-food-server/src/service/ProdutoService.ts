import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericService } from './GenericService';
import { Produto } from 'src/model/produto.model';

@Injectable()
export class ProdutoService extends GenericService<Produto> { 
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {
    super(Produto, produtoRepository)
  }
}
