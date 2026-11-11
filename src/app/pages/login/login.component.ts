import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private router: Router
  ) {}

  async onLogin() {
    this.loading = true;
    this.errorMessage = '';

    try {
      const firebaseUser = await this.authService.login(this.email, this.password);

      if (firebaseUser && firebaseUser.uid) {
        const userProfile = await this.userService.loadUserData(firebaseUser.uid);

        if (userProfile) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Usuário autenticado, mas não possui um perfil no sistema.';
          await this.authService.logout(); 
        }
      } else {
        this.errorMessage = 'Ocorreu um erro interno durante o login.';
      }

    } catch (error: any) {
      this.errorMessage = this.handleError(error.code);
    } finally {
      this.loading = false;
    }
  }

  async onResetPassword() {
    if (!this.email) {
      this.errorMessage = 'Informe seu e-mail para redefinir a senha.';
      return;
    }

    try {
      await this.authService.resetPassword(this.email);
      alert('E-mail de redefinição de senha enviado!');
    } catch (error: any) {
      this.errorMessage = this.handleError(error.code);
    }
  }

  private handleError(code: string): string {
    switch (code) {
      case 'auth/invalid-email': return 'E-mail inválido.';
      case 'auth/user-not-found': return 'Usuário não encontrado.';
      case 'auth/wrong-password': return 'Senha incorreta.';
      default: return 'Erro ao fazer login. Tente novamente.';
    }
  }
}