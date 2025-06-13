import { Component, Input, Output, EventEmitter } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink 
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() menuAberto: boolean = false;
  @Output() menuToggle = new EventEmitter<boolean>();

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
    this.menuToggle.emit(this.menuAberto);
  }

}