import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interface/desafio.schema';
import { JogadoresModule } from '../jogadores/jogadores.module';
import { CategoriasModule } from '../categorias/categorias.module';
import { PartidaSchema } from './interface/partida.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Desafio', schema: DesafioSchema }, { name: 'Partida', schema: PartidaSchema }]),
    JogadoresModule,
    CategoriasModule
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService]
})
export class DesafiosModule {}
