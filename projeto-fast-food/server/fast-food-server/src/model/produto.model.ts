// src/models/produto.model.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from './categoria.model';
import { Usuario } from './usuario.model';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  valor: number;

  @ManyToOne(() => Categoria, categoria => categoria.id)
  categoria: Categoria;

  @Column({ default: true })
  is_ativo: boolean;

  @ManyToOne(() => Usuario, usuario => usuario.id, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;
}
