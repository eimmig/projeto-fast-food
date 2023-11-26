import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericService } from './GenericService';
import { PedidoItem } from 'src/model/pedido_item.model';

@Injectable()
export class PedidoItemService extends GenericService<PedidoItem> { 
  constructor(
    @InjectRepository(PedidoItem)
    private readonly pedidoItemRepository: Repository<PedidoItem>,
  ) {
    super(pedidoItemRepository)
  }
}
