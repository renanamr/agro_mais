import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
    // Lógica do ano do copyright movida para cá
    currentYear = new Date().getFullYear();
}
