import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
  private produtos: Produto[] = [];
  private nextId = 1;

  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) { }

  findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }
  async remove(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
  async update(id: number, produto: Produto): Promise<Produto | null> {
    await this.produtoRepository.update(id, produto);
    return this.produtoRepository.findOneBy({ id });
  }

  async create(produto: Partial<Produto>): Promise<Produto> {
    const novo = this.produtoRepository.create(produto); 
    return this.produtoRepository.save(novo);
  }


}
