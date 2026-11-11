import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    constructor(
      private router: Router,
      private authService: AuthService,
      private userService: UserService,
    ) {}
  
    logout() {
      console.log("Fazendo logout...");
      this.userService.clearUserData();
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}
