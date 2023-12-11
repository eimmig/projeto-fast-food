import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericService } from './GenericService';
import { Produto } from 'src/model/produto.model';
import { Categoria } from 'src/model/categoria.model';
import { Usuario } from 'src/model/usuario.model';
import { Pedido } from 'src/model/pedido.model';
import { PedidoItem } from 'src/model/pedido_item.model';

@Injectable()
export class ProdutoService extends GenericService<Produto> {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(PedidoItem)
    private readonly pedidoItemRepository: Repository<PedidoItem>,
  ) {
    super(produtoRepository)
  }

  async getAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({ relations: ["categoria"] });
  }

  async getById(id: number): Promise<Produto | undefined> {
    return await this.produtoRepository.findOne({ where: { id }, relations: ["categoria"] });
  }



  async getByUser(id: number): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { usuario: { id } },
      relations: ['categoria'],
    });
  }

  async save(produto: any): Promise<Produto> {
    const produtoSave = new Produto();
    produtoSave.nome = produto.nome;
    produtoSave.valor = produto.valor;
    produtoSave.categoria = await this.categoriaRepository.findOneById(produto.categoriaId);
    produtoSave.is_ativo = produto.status;
    produtoSave.usuario = await this.usuarioRepository.findOneById(produto.enderecoId);
    const newproduto = await this.produtoRepository.save(produtoSave);

    return newproduto;
  }

  async update(produto: any): Promise<void> {
    const produtoSave = await this.produtoRepository.findOneById(produto.id);
    produtoSave.nome = produto.nome;
    produtoSave.valor = produto.valor;
    produtoSave.categoria = await this.categoriaRepository.findOneById(produto.categoriaId);
    produtoSave.is_ativo = produto.status;
    produtoSave.usuario = await this.usuarioRepository.findOneById(produto.enderecoId);
    const newproduto = await this.produtoRepository.save(produtoSave);
  }

  async delete(id: number): Promise<boolean> {
    const pedido = await this.pedidoItemRepository.find({
      where: { produto: { id } }
    });

    if (pedido.length > 0) {
      return false
    } else
      await this.produtoRepository.delete(id);
    return true
  }
}

