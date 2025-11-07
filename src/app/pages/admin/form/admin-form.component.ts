import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { User } from '../../../models/user';
import { UserDataService } from '../../user/service/user-data.service';
import { HeaderComponent } from "../../../components/header/header.component";
import { ContainerFormComponent } from "../../../components/container-form/container-form.component";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingComponent,
    HeaderComponent,
    ContainerFormComponent
],
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormCompoment implements OnInit {

  public userForm: FormGroup;
  public loading = signal<boolean>(true);
  public pageMode = signal< 'Edit' | 'View'>('Edit');
  public pageTitle = signal<string>('Edição de permissão do usuário');

  private currentUserId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    // Inicializa o formulário
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      role: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      status: ['Ativo', [Validators.required]],
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
    const urlSegment = this.route.snapshot.url[0]?.path;

    if (id) {
      this.currentUserId = id;

      if (urlSegment === 'visualizar') {
        this.pageMode.set('View');
        this.pageTitle.set('Visualização de permissão');
        await this.loadUser(id);
        this.userForm.disable();
      } else {
        this.pageMode.set('Edit');
        this.pageTitle.set('Edição de permissão');
        await this.loadUser(id);
      }
    }
  }

  /**
   * Carrega os dados do usuário no formulário para os modos Edit e View.
   */
  private async loadUser(id: string) {
    this.loading.set(true);
    const user = await this.userDataService.getUser(id);
    if (user) {
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
     if (this.pageMode() === 'Edit') {
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
   * Lógica de Atualização de Usuário.
   */
  private async handleUpdate() {
    if (!this.currentUserId) return;

    // Cria uma nova instância de User com os dados atualizados
    const updatedUser = new User({
      id: this.currentUserId,
      ...this.userForm.value
    });

    await this.userDataService.updateUser(updatedUser);
    alert('Usuário atualizado com sucesso!');
    this.goBack();
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