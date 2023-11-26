// src/models/endereco.model.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from './usuario.model';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.endereco)
  usuario: Usuario;

  @Column()
  rua: string;

  @Column()
  bairro: string;

  @Column()
  numero: string;

  @Column()
  complemento: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;
}
