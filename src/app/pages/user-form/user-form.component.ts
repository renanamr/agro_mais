import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { User } from '../../models/user';
import { CreateUserPayload } from '../user/models/user-payload.model';
import { UserDataService } from '../user/service/user-data.service';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    LoadingComponent,
    HeaderComponent
],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  
  public userForm: FormGroup;
  public loading = signal<boolean>(true);
  public pageMode = signal<'Create' | 'Edit' | 'View'>('Create');
  public pageTitle = signal<string>('Cadastro de novo usuário');
  
  private currentUserId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private router: Router,
    private route: ActivatedRoute, 
    private location: Location 
  ) {
    // Inicializa o formulário
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]], // Adicione um validador de CPF real aqui
      birthDate: ['', [Validators.required]],
      role: ['agente', [Validators.required]], // Valor padrão
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.determineMode();
  }

  /**
   * Verifica a URL para determinar se estamos em modo "Create", "Edit" ou "View".
   */
  private async determineMode() {
    // Pega o 'id' da URL (ex: /usuarios/editar/123)
    const id = this.route.snapshot.paramMap.get('id');
    // Pega o modo da query string (ex: /usuarios/editar/123?mode=view)
    const mode = this.route.snapshot.queryParamMap.get('mode');
    
    if (id) {
      this.currentUserId = id;
      
      if (mode === 'view') {
        this.pageMode.set('View');
        this.pageTitle.set('Visualização de usuário');
        await this.loadUser(id);
        this.userForm.disable(); // Desabilita todos os campos
      } else {
        this.pageMode.set('Edit');
        this.pageTitle.set('Edição de usuário');
        await this.loadUser(id);
      }
    } else {
      this.pageMode.set('Create');
      this.pageTitle.set('Cadastro de novo usuário');
      this.loading.set(false); // Não precisa carregar nada
    }
  }

  /**
   * Carrega os dados do usuário no formulário para os modos Edit e View.
   */
  private async loadUser(id: string) {
    this.loading.set(true);
    const user = await this.userDataService.getUser(id);
    if (user) {
      // Usa patchValue para preencher o formulário com os dados do modelo (Inglês)
      this.userForm.patchValue(user);
    } else {
      console.error('Usuário não encontrado!');
      this.goBack();
    }
    this.loading.set(false);
  }

  /**
   * Função principal do formulário (submit).
   */
  async onSubmit() {
    if (this.userForm.invalid) {
      // Marca todos os campos como "tocados" para exibir os erros
      this.userForm.markAllAsTouched(); 
      return;
    }

    this.loading.set(true);
    try {
      if (this.pageMode() === 'Create') {
        await this.handleCreate();
      } else if (this.pageMode() === 'Edit') {
        await this.handleUpdate();
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Ocorreu um erro ao salvar. Tente novamente.');
    } finally {
      this.loading.set(false);
    }
  }

  /**
   * Lógica de Criação de Usuário.
   */
  private async handleCreate() {
    // 1. Gera a senha (conforme solicitado)
    const generatedPassword = this.generateRandomPassword();

    // 2. Monta o payload (Inglês)
    const payload: CreateUserPayload = {
      ...this.userForm.value,
      password: generatedPassword
    };

    // 3. Chama o serviço
    await this.userDataService.createUser(payload);
    
    // 4. (Opcional) Informa a senha gerada ao admin
    alert(`Usuário criado com sucesso! Senha temporária: ${generatedPassword}`);
    
    this.goBack();
  }

  /**
   * Lógica de Atualização de Usuário.
   */
  private async handleUpdate() {
    if (!this.currentUserId) return;

    // 1. Cria uma nova instância de User com os dados atualizados
    const updatedUser = new User({
      id: this.currentUserId,
      ...this.userForm.value
    });

    // 2. Chama o serviço
    await this.userDataService.updateUser(updatedUser);
    alert('Usuário atualizado com sucesso!');
    this.goBack();
  }

  /**
   * Gera uma senha aleatória simples (apenas para exemplo).
   * Em produção, use uma biblioteca mais robusta ou um Cloud Function.
   */
  private generateRandomPassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  /**
   * Retorna para a página anterior (a lista).
   */
  goBack() {
    this.location.back();
  }

  // Funções helper para o template (exibir erros)
  isInvalid(controlName: string) {
    const control = this.userForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}