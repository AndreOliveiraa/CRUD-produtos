import { Routes } from '@angular/router';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { CategoriaListComponent } from './components/categoria-list/categoria-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ProdutoListComponent,
  },
  {
    path: 'categorias',
    component: CategoriaListComponent,
  },
  {
    path: 'produtos',
    component: ProdutoListComponent,
  },
];
