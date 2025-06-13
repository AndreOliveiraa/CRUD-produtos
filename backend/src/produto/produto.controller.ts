import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Body,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { Produto } from './entities/produto.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';



@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Get()
  async getAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.produtoService.remove(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() produto: Produto
  ): Promise<Produto> {
    const atualizado = await this.produtoService.update(+id, produto);

    if (!atualizado) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return atualizado;
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagem', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: any): Promise<Produto> {
    const produto: Partial<Produto> = {
      nome: body.nome,
      preco: body.preco,
      categoria: body.categoria,
      descricao: body.descricao,
      imagemUrl: file.filename,
    };

    return this.produtoService.create(produto);
  }
}
