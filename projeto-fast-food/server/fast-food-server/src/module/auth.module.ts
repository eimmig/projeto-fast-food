import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Usuario } from 'src/model/usuario.model';
import { UsuarioService } from 'src/service/UsuarioService';
import { UsuarioController } from 'src/controller/UsuarioController';
import { CategoriaController } from 'src/controller/CategoriaController';
import { CategoriaService } from 'src/service/CategoriaService';
import { Categoria } from 'src/model/categoria.model';
import { EmailController } from 'src/controller/EmailController';
import { Endereco } from 'src/model/endereco.model';
import { EnderecoController } from 'src/controller/EnderecoController';
import { ProdutoController } from 'src/controller/ProdutoController';
import { PedidoController } from 'src/controller/PedidoController';
import { EnderecoService } from 'src/service/EnderecoService';
import { PedidoService } from 'src/service/PedidoService';
import { ProdutoService } from 'src/service/ProdutoService';
import { EmailService } from 'src/service/EmailService';
import { Pedido } from 'src/model/pedido.model';
import { Produto } from 'src/model/produto.model';
import { PedidoItem } from 'src/model/pedido_item.model';

@Module({
  imports: [
  TypeOrmModule.forFeature([Usuario, Categoria, Endereco, Produto, Pedido, PedidoItem]),
    JwtModule.register({
      secret: 'projeto-restaurante-fast-food-token',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsuarioController, CategoriaController, EmailController, EnderecoController, ProdutoController, PedidoController],
  providers: [UsuarioService, CategoriaService, EnderecoService, PedidoService, ProdutoService, EmailService],
})
export class AuthModule {}
