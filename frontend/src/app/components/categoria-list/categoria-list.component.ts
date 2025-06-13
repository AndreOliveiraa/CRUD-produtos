import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Para usar routerLink nos links

@Component({
  selector: 'app-categoria-list',
  imports: [RouterLink],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent {

}
