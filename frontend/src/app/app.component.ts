import { Component } from '@angular/core';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet],
  template: `    <app-sidebar [menuAberto]="isSidebarOpen" (menuToggle)="isSidebarOpen = $event"></app-sidebar>
     <main>
        <router-outlet></router-outlet>
    </main>
  
  `,
})
export class AppComponent {
    isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
 }
