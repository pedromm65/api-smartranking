import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {

    @Post()
    async criarAtualizarJogador(
        @Body() createPlayerDto: CreatePlayerDto) {
        const { email } = createPlayerDto
        return JSON.stringify(`{
            "email": ${email} 
        }`)
    }
}
