import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/model/usuario.model';
import { Categoria } from 'src/model/categoria.model';
import { Produto } from 'src/model/produto.model';
import { Pedido } from 'src/model/pedido.model';
import { PedidoItem } from 'src/model/pedido_item.model';
import { Endereco } from 'src/model/endereco.model';

@Module({
  imports: [
  TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'public',
      entities: [Usuario, Categoria, Produto, Pedido, PedidoItem, Endereco],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
