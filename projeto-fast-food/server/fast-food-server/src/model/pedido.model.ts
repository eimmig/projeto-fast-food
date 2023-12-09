// src/models/pedido.model.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.model';
import { Endereco } from './endereco.model';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  valor_total: number;

  @ManyToOne(() => Usuario, usuario => usuario.id)
  usuario: Usuario;

  @ManyToOne(() => Endereco, endereco => endereco.id)
  endereco: Endereco;

  @Column()
  status: string;

  @Column()
  data_pedido: Date;

  @ManyToOne(() => Usuario, usuario => usuario.id)
  usuario_empresa: Usuario;
}
