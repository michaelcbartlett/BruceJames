import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    
    
  }
  faInstagram = faInstagram;
}
