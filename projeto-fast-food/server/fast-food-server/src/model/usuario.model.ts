// src/models/usuario.model.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Endereco } from './endereco.model';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  telefone: string;

  @Column()
  senha: string;

  @PrimaryColumn()
  email: string;

  @ManyToOne(() => Endereco, endereco => endereco.id)
  endereco: Endereco;
}
