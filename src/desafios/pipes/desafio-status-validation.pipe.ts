import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { DesafioStatus } from '../interface/desafio-status.enum';

@Injectable()
export class DesafiosStatusValidacaoPipe implements PipeTransform {

  readonly statusPermitidos = [
    DesafioStatus.ACEITO,
    DesafioStatus.CANCELADO,
    DesafioStatus.NEGADO,
    DesafioStatus.PENDENTE,
    DesafioStatus.REALIZADO,
  ]

  transform(value: any, metadata: ArgumentMetadata) {
    const status = value.status.toUpperCase()

    if (!this.ehStatusValido(status)) {
        throw new BadRequestException(`${status} é um status inválido`)
    }

    return value
  }

    private ehStatusValido(status: any) {
        const idx = this.statusPermitidos.indexOf(status)

        return idx !== -1
    }
}
