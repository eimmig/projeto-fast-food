// src/models/produto.model.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Categoria } from './categoria.model';

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
}
