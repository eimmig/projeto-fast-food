import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericService } from './GenericService';
import { Pedido } from 'src/model/pedido.model';
import { Usuario } from 'src/model/usuario.model';
import { Endereco } from 'src/model/endereco.model';
import { PedidoItem } from 'src/model/pedido_item.model';
import { Produto } from 'src/model/produto.model';

@Injectable()
export class PedidoService extends GenericService<Pedido> {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    @InjectRepository(PedidoItem)
    private readonly pedidoItemRepository: Repository<PedidoItem>,
  ) {
    super(pedidoRepository);
  }

  async save(pedido: any): Promise<Pedido> {
    const pedidoSave = new Pedido();
    pedidoSave.valor_total = pedido.subtotal;
    pedidoSave.data_pedido = new Date();
    pedidoSave.status = 'NAO_LIDO';
    if (pedido.deliveryOption != 'local') {
      pedidoSave.usuario = await this.usuarioRepository.findOneById(pedido.usuarioId);
    }
    pedidoSave.endereco = await this.enderecoRepository.findOneById(pedido.enderecoId);
    const newPedido = await this.pedidoRepository.save(pedidoSave);

    for (const item of pedido.cart) {
      const pedidoItens = new PedidoItem();
      pedidoItens.pedido = newPedido;
      pedidoItens.produto = await this.produtoRepository.findOneById(item.id);
      pedidoItens.quantidade = item.quantity;
      pedidoItens.valor = item.valor;
      const newPedidoItem = await this.pedidoItemRepository.save(pedidoItens);
    }
  
    return newPedido;
  }

  async findByUser(id: number): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: { usuario: { id } },
      relations: ['usuario', 'endereco'],
    });
  }

  async findByEmpresa(id: number): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: { usuario_empresa: { id } },
      relations: ['usuario', 'endereco'],
    });
  }

  async getById(idPedido: number): Promise<Pedido> {
    return this.pedidoRepository.findOne({
      where: { id: idPedido  },
      relations: ['usuario', 'endereco'],
    });
  }

  async update(id: string | number, updatedItem): Promise<void> {
    const pedido = this.pedidoRepository.findOneById(id);
    (await pedido).status = updatedItem.status;
    await this.pedidoRepository.update(id, updatedItem);
  }
  
}
