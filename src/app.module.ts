import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:nLgjX0qhXhCzateV@cluster0.nzdgbx9.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useCreateIndex: true,
        useFindAndModify: false,
      },
    ),
    JogadoresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
