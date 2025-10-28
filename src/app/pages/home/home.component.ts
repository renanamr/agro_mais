import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { UserDataService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink 
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent {
  
  // Lógica do ano do copyright movida para cá
  currentYear = new Date().getFullYear();

  constructor(
    private router: Router,
    private authService: AuthService,
    private userDataService: UserDataService,
  ) {}

  logout() {
    console.log("Fazendo logout...");
    this.userDataService.clearUserData();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  
}