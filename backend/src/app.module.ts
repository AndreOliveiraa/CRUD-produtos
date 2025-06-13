import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'produtosdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProdutoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
