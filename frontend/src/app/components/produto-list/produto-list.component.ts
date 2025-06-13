// produto-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environments';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Mantenha ActivatedRoute e Router
import { RouterLink } from '@angular/router'; // Se necessário

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
  descricao: string;
  imagemUrl?: string;
}

@Component({
  standalone: true,
  selector: 'app-produto-list',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './produto-list.component.html',
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];
  modalAberto = false;
  novoProduto = {
    nome: '',
    preco: 0,
    categoria: '',
    descricao: ''
  };
  imagemSelecionada: File | null = null;
  produtoEditando: Produto | null = null;
  produtoExcluindo = false;
  produtoParaExcluir: Produto | null = null;

  categoriaFiltrada: string | null = null; // Mantenha esta variável

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute, // Injetado
    private router: Router // Injetado
  ) { }

  ngOnInit(): void {
    // Inscreve-se nas mudanças dos QUERY PARAMETERS da rota
    this.route.queryParamMap.subscribe(params => { // <-- MUDANÇA AQUI: use queryParamMap
      this.categoriaFiltrada = params.get('categoria'); // Pega o valor do parâmetro 'categoria'
      this.carregarProdutos(); // Recarrega os produtos sempre que a categoria filtrada mudar
    });
  }

  carregarProdutos(): void {
    let url = `${environment.apiUrl}/produto`;

    if (this.categoriaFiltrada) {
      // Agora, a URL da API terá o parâmetro de consulta, por exemplo: /api/produto?categoria=processador
      url = `${environment.apiUrl}/produto?categoria=${this.categoriaFiltrada}`;
    }

    this.http.get<Produto[]>(url)
      .subscribe(data => {
        this.produtos = data;
         if (this.categoriaFiltrada) {
          this.produtos = this.produtos.filter(p => p.categoria.toLowerCase() === this.categoriaFiltrada!.toLowerCase());
        }
      });
  }


  abrirModal(produto: Produto): void {
    this.produtoEditando = { ...produto };
  }

  fecharModal(): void {
    this.produtoEditando = null;
  }

  salvarEdicao(): void {
    if (!this.produtoEditando) return;

    this.http.put(`${environment.apiUrl}/produto/${this.produtoEditando.id}`, this.produtoEditando)
      .subscribe(() => {
        const index = this.produtos.findIndex(p => p.id === this.produtoEditando!.id);
        if (index !== -1) this.produtos[index] = { ...this.produtoEditando! };
        this.fecharModal();
      });
  }

  abrirModalCriar() {
    this.modalAberto = true;
    this.novoProduto = { nome: '', preco: 0, categoria: '', descricao: '' };
    this.imagemSelecionada = null;
  }

  fecharModalCriar() {
    this.modalAberto = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.imagemSelecionada = input.files[0];
    }
  }

  criarProduto() {
    const formData = new FormData();
    formData.append('nome', this.novoProduto.nome);
    formData.append('preco', this.novoProduto.preco.toString());
    formData.append('categoria', this.novoProduto.categoria);
    formData.append('descricao', this.novoProduto.descricao);
    if (this.imagemSelecionada) {
      formData.append('imagem', this.imagemSelecionada);
    }

    this.http.post(`${environment.apiUrl}/produto`, formData)
      .subscribe(() => {
        this.fecharModalCriar();
        this.carregarProdutos();
      });
  }

  abrirModalExclusao(produto: Produto): void {
    this.produtoParaExcluir = produto;
    this.produtoExcluindo = true;
  }

  fecharModalExclusao(): void {
    this.produtoExcluindo = false;
    this.produtoParaExcluir = null;
  }

  confirmarExclusao(): void {
    if (!this.produtoParaExcluir) {
      return;
    }

    this.http.delete(`${environment.apiUrl}/produto/${this.produtoParaExcluir.id}`)
      .subscribe(() => {
        this.produtos = this.produtos.filter(p => p.id !== this.produtoParaExcluir!.id);
        this.fecharModalExclusao();
      }, error => {
        console.error('Erro ao excluir produto:', error);
        this.fecharModalExclusao();
      });
  }

  excluirProduto(id: number): void {
    const produto = this.produtos.find(p => p.id === id);
    if (produto) {
      this.abrirModalExclusao(produto);
    }
  }
}