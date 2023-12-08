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
    super(produtoRepository)
  }

  async getAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({ relations: ["categoria"] });
  }

  async getByUser(id: number): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { usuario: { id } },
      relations: ['categoria'],
    });
  }

}
