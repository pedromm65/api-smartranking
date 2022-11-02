import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from '../categorias/categorias.service';
import { Categoria } from '../categorias/interface/categoria.interface';
import { JogadoresService } from '../jogadores/jogadores.service';
import { CriarDesafioDto } from './dto/criar-desafio.dto';

import { UpdateDesafioDto } from './dto/update-desafio.dto';
import { DesafioStatus } from './interface/desafio-status.enum';
import { Desafio } from './interface/desafio.interface';

@Injectable()
export class DesafiosService {

  constructor(
    @InjectModel("Desafio") private readonly desafioModel: Model<Desafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService,
  ) {}

  private readonly logger = new Logger(DesafiosService.name)

  async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
   
    const jogadores = await this.jogadoresService.consultarTodosJogadores();
 
    criarDesafioDto.jogadores.map(jogadorDto => {
      const jogadorFilter = jogadores.filter( jogador => jogador._id == jogadorDto._id )
      if (jogadorFilter.length == 0) {
          throw new BadRequestException(`O id ${jogadorDto._id} não é um jogador!`)
      }
  })


    const solicitanteEJogadorDaPartida = criarDesafioDto.jogadores.filter(jogador => jogador._id == criarDesafioDto.solicitante)

    this.logger.log(`solicitanteEJogadorDaPartida: ${solicitanteEJogadorDaPartida}`)

    if (solicitanteEJogadorDaPartida.length == 0) {
      throw new BadRequestException(`O solicitante deve ser um jogador da partida!`)
    }

    const categoriaDoJogador = await this.categoriasService.consultarCategoriaDoJogador(criarDesafioDto.solicitante);

    if (!categoriaDoJogador) {
      throw new BadRequestException(`O solicitante precisa estar registrado em uma categoria!`)
    }

    const desafioCriado = new this.desafioModel(criarDesafioDto)
    desafioCriado.categoria = categoriaDoJogador.categoria
    desafioCriado.dataHoraSolicitacao = new Date()
    this.logger.log(`desafioCriado.dataHoraSolicitacao: ${desafioCriado.dataHoraSolicitacao}`)

    desafioCriado.status = DesafioStatus.PENDENTE
    this.logger.log(`desafioCriado: ${JSON.stringify(desafioCriado)}`)
    return await desafioCriado.save()

  }

  async consultarTodosDesafios(): Promise<Array<Desafio>> {
    return this.desafioModel.find().exec()
  }

  async consultarDesafioPeloId(_id: any): Promise<Desafio> {
    const desafio = await this.desafioModel.findOne({ _id })
    return 
  }

  async atualizarDesafio(id: number, updateDesafioDto: UpdateDesafioDto) {
    return `This action updates a #${id} desafio`;
  }

  async deletarDesafio(id: number) {
    return `This action removes a #${id} desafio`;
  }
}
