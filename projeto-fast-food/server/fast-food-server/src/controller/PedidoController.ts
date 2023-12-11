import { Controller, Get, Param } from '@nestjs/common';
import { PedidoService } from 'src/service/PedidoService';
import { GenericController } from './GenericController';
import { Pedido } from 'src/model/pedido.model';

@Controller('pedido')
export class  PedidoController extends GenericController<Pedido> {
  constructor(private readonly pedidoService: PedidoService) {
    super(pedidoService);
  }

  @Get('/findByUser/:id')
  async findByUser(@Param('id') id: string): Promise<Pedido[]> {
    return this.pedidoService.findByUser(parseInt(id, 10));
  }

  @Get('/getAllByEmpresa/:id')
  async getAllEmpresa(@Param('id') id: string): Promise<Pedido[]> {
    return this.pedidoService.findByEmpresa(parseInt(id, 10));
  }

}