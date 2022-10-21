import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
export class jogadoresValidacaoParametrosPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        
        if(!value) {
            throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado`)
        }

        console.log(`Value: ${value} Metadata: ${metadata.type}`)

        return value;
    }

}