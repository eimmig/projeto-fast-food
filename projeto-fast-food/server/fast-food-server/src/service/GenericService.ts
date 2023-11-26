import { Repository, DeepPartial } from 'typeorm';
import {  } from '@nestjs/typeorm';

export class GenericService<T> {
  private readonly repository: Repository<T>;

  constructor(repositoryClass: Repository<T>) {
    this.repository = repositoryClass;
  }


  async save(item: DeepPartial<T>): Promise<T> {
    const newItem = this.repository.create(item);
    return await this.repository.save(newItem);
  }

  async getById(id: string | number): Promise<T | undefined> {
    return this.repository.findOneById(id);
  }

  async getAll(): Promise<T[]> {
    return this.repository.find();
  }

  async delete(id: string | number): Promise<void> {
    await this.repository.delete(id);
  }

  async update(id: string | number, updatedItem): Promise<void> {
    await this.repository.update(id, updatedItem);
  }

  validarCamposPreenchidos(dados: any): boolean {
    for (const prop in dados) {
      if (!dados[prop]) {
        return false;
      }
    }
    return true;
  }
}
