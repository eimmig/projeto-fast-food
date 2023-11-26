import { Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { GenericService } from 'src/service/GenericService';

export  class GenericController<T> {
  constructor(private readonly genericService: GenericService<T>) {}

  @Post('/save')
  save(@Body() item: T): void {
    this.genericService.save(item);
  }

  @Get(':id')
  async getById(id: string): Promise<T | undefined> {
    return await this.genericService.getById(parseInt(id, 10));
  }

  @Get('/getAll')
  async getAll(): Promise<T[]> {
    return await this.genericService.getAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.genericService.delete(parseInt(id, 10));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedItem: T): void {
    this.genericService.update(parseInt(id, 10), updatedItem);
  }
}
