import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericService } from './GenericService';
import { Pedido } from 'src/model/pedido.model';

@Injectable()
export class PedidoService extends GenericService<Pedido> { 
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {
    super(pedidoRepository)
  }
}
