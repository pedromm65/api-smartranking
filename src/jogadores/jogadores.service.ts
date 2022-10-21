import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogadorDto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
 
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      this.atualizar(criarJogadorDto);
    } else {
      this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if(!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado.`)
    }

    return jogadorEncontrado;

  }

  async deletarJogador(email: string): Promise<any> {
    return await this.jogadorModel.deleteOne({ email }).exec();
  }

  private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {

    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
   

    return await jogadorCriado.save();

  }

  private async atualizar(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return this.jogadorModel.findOneAndUpdate({ email: criarJogadorDto.email }, { $set: criarJogadorDto }).exec();
  }
}
