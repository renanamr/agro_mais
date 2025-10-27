import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; // Importar RouterLink E Router
// Importe seu serviço de autenticação
// import { AuthService } from '../auth/auth.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink // Necessário para [routerLink] e routerLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent {
  
  // Lógica do ano do copyright movida para cá
  currentYear = new Date().getFullYear();

  // Injetamos o Router para navegar ao fazer logout
  constructor(
    private router: Router
    // private authService: AuthService // Descomente quando tiver seu serviço
  ) {}

  /**
   * Método de Logout
   */
  logout() {
    console.log("Fazendo logout...");
    // 1. Chame seu serviço de Auth para limpar o token/sessão
    // await this.authService.logout();

    // 2. Navegue de volta para a tela de login
    this.router.navigate(['/login']);
  }
}