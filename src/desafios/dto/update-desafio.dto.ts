import { PartialType } from '@nestjs/mapped-types';
import { CriarDesafioDto } from './criar-desafio.dto';

export class UpdateDesafioDto extends PartialType(CriarDesafioDto) {}
