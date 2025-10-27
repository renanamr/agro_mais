import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    this.loading = true;
    this.errorMessage = '';

    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']);
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