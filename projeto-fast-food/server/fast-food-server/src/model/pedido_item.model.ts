// src/models/pedido_item.model.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pedido } from './pedido.model';
import { Produto } from './produto.model';

@Entity()
export class PedidoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, pedido => pedido.id)
  pedido: Pedido;

  @ManyToOne(() => Produto, produto => produto.id)
  produto: Produto;

  @Column()
  quantidade: number;

  @Column()
  valor: number;
}
