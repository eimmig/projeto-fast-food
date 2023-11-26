import { Controller } from '@nestjs/common';
import { PedidoService } from 'src/service/PedidoService';
import { GenericController } from './GenericController';
import { Pedido } from 'src/model/pedido.model';

@Controller('pedido')
export class  CategoriaController extends GenericController<Pedido> {
  constructor(private readonly pedidoService: PedidoService) {
    super(pedidoService);
  }
}