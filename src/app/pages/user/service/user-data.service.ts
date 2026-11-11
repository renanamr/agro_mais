import { Injectable, signal } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service.js';
import { AuthService } from '../../../services/auth.service.js';
import { User, UsuarioData } from '../../../models/user.js';
import { CreateUserPayload } from '../models/user-payload.model.js';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public userList = signal<User[]>([]);

  constructor(
    private firebaseService: FirebaseService, 
    private authService: AuthService
  ) {}


  async loadUserList(): Promise<void> {
    try {
      const rawDataList = await this.firebaseService.getList<UsuarioData>('usuarios');
      
      const userInstances = rawDataList.map(rawData => {
        const { id, ...docData } = rawData; 
        return User.fromFirestore(docData as UsuarioData, id);
      });

      this.userList.set(userInstances);

    } catch (error) {
      console.error("Erro ao carregar lista de usuários:", error);
      this.userList.set([]);
    }
  }

  async getUser(id: string): Promise<User | null> {
    try {
      const firebaseData = await this.firebaseService.get<UsuarioData>('usuarios', id);

      if (firebaseData) {
        const { id: docId, ...docData } = firebaseData;
        return User.fromFirestore(docData as UsuarioData, docId);
      }
      
      return null;

    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error);
      return null;
    }
  }

  async createUser(payload: CreateUserPayload): Promise<User> {
    const { password, ...profileData } = payload; // Separa a senha do resto do perfil

    try {
      const uid = await this.authService.register(profileData.email, password);
      if (!uid) {
        throw new Error('Falha ao registrar usuário no Auth. O UID veio nulo.');
      }

      const userInstance = new User({
        id: uid,
        ...profileData
      });

      const firestoreData = userInstance.toFirestore();

      await this.firebaseService.put('usuarios', uid, firestoreData);

      this.userList.update(currentList => [...currentList, userInstance]);

      return userInstance;

    } catch (error) {
      console.error("Erro ao criar usuário completo:", error);
      throw error; // Propaga o erro para o componente
    }
  }


  async updateUser(userInstance: User): Promise<void> {
    if (!userInstance.id) {
      throw new Error('Usuário sem ID não pode ser atualizado.');
    }

    try {
      const firestoreData = userInstance.toFirestore();
      
      await this.firebaseService.put('usuarios', userInstance.id, firestoreData);

      this.userList.update(currentList =>
        currentList.map(u => (u.id === userInstance.id ? userInstance : u))
      );

    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }

  
  async deleteUser(userId: string): Promise<void> {
    if (!userId) {
      throw new Error('ID do usuário é necessário para deletar.');
    }

    try {
      await this.firebaseService.delete('usuarios', userId);

      this.userList.update(currentList => currentList.filter(u => u.id !== userId));

    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      throw error;
    }
  }
}