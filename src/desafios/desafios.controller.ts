import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query, Put } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { CriarDesafioDto } from './dto/criar-desafio.dto';
import { AtualizarDesafioDto } from './dto/atualizar-desafio.dto';
import { Desafio } from './interface/desafio.interface';
import { DesafiosStatusValidacaoPipe } from './pipes/desafio-status-validation.pipe';
import { AtribuirDesafioPartidaDto } from './dto/atribuir-desafio-partida.dto';

@Controller('api/v1/desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() criarDesafioDto: CriarDesafioDto) {
    return this.desafiosService.criarDesafio(criarDesafioDto);
  }

  @Get()
  async listarDesafios(
    @Query('idJogador') _id: string) : Promise<Array<Desafio>>
   {
    return _id ? await this.desafiosService.consultarDesafiosDeUmJogador(_id)
      : await this.desafiosService.consultarTodosDesafios()
  }

  @Put('/:desafio')
  async atualizarDesafio(
    @Body(DesafiosStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
    @Param('desafio') _id: string): Promise<void> {
      await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto)
    }

  
  @Post('/:desafio/partida/')
  async atribuirDesafioPartida(
    @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
    @Param('desafio') _id: string): Promise<void> {
      return await this.desafiosService.atribuirDesafioPartida(_id, atribuirDesafioPartidaDto)
    }
  
  @Delete(':id')
  deletarDesafio(@Param('id') _id: string) {
    return this.desafiosService.deletarDesafio(_id);
  }
}
