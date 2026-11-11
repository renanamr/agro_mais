import { Injectable, signal, computed } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { User, UsuarioData } from '../models/user.js';
import { FirebaseCollectionsUtils } from '../utils/firebase_collections_utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  readonly currentUser = signal<User | null>(null);

  readonly isLoggedIn = computed(() => this.currentUser() !== null);
  
  readonly welcomeName = computed(() => {
    return this.currentUser()?.name.split(' ')[0] || 'Usuário';
  });

  constructor(private fbs: FirebaseService) {}


  async loadUserData(uid: string): Promise<User | null> {
    try {
      const firebaseData = await this.fbs.get<UsuarioData>(
        FirebaseCollectionsUtils.user, uid);

      if (firebaseData) {
        
        const docId = firebaseData.id;
        const docData = { ...firebaseData };
        delete (docData as any).id; 

        const userInstance = User.fromFirestore(docData, docId);
        this.currentUser.set(userInstance);
        return userInstance;
      } else {
        console.warn(`Usuário (UID: ${uid}) não encontrado na coleção 'usuarios'.`);
        this.currentUser.set(null); 
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      this.currentUser.set(null);
    }

    return null;
  }

  clearUserData() {
    this.currentUser.set(null);
  }
}