import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogadorDto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/autializar-jogador.dto';

@Injectable()
export class JogadoresService {
 
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(`Email: ${email} already registered!`)
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
   
    return await jogadorCriado.save();
  }

  async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {
    
    await this.acharJogadorPeloId(_id);

    await this.jogadorModel.findOneAndUpdate({ _id }, { $set: atualizarJogadorDto }).exec();
  
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador> {
    return await this.acharJogadorPeloId(_id);

  }

  async deletarJogador(_id: string): Promise<any> {
    await this.acharJogadorPeloId(_id);

    return await this.jogadorModel.deleteOne({ _id }).exec();
  }

  private async acharJogadorPeloId(_id: string) {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id: ${_id} não encontrado.`);
    } else {
      return jogadorEncontrado;
    }
  }
}
