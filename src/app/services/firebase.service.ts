import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  DocumentData,
  WithFieldValue
} from '@angular/fire/firestore';

interface BaseModel {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: Firestore) {}

  /**
   * (POST) Cria um novo documento
   */
  async post<T extends WithFieldValue<DocumentData>>(
    collectionName: string,
    data: T
  ): Promise<T & BaseModel> {
    try {
      const colRef = collection(this.db, collectionName);
      const docRef = await addDoc(colRef, data); 
      
      return { ...data, id: docRef.id };

    } catch (error) {
      console.error(`Erro ao criar documento em ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * (GET List) Busca todos os documentos
   */
  async getList<T>(collectionName: string): Promise<(T & BaseModel)[]> {
    try {
      const colRef = collection(this.db, collectionName);
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map(doc => ({ ...(doc.data() as T), id: doc.id }));
    } catch (error) {
      console.error(`Erro ao buscar lista de ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * (GET) Busca um único documento
   */
  async get<T>(collectionName: string, id: string): Promise<(T & BaseModel) | null> {
    try {
      const docRef = doc(this.db, collectionName, id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      return { ...(snapshot.data() as T), id: snapshot.id };
    } catch (error) {
      console.error(`Erro ao buscar documento ${id} de ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * (PUT) Substitui um documento existente
   */
  async put<T extends WithFieldValue<DocumentData>>(
    collectionName: string,
    id: string,
    data: T
  ): Promise<void> {
    try {
      const docRef = doc(this.db, collectionName, id);
      
      // Criamos uma cópia para remover o 'id' antes de salvar
      const dataToSave = { ...data };
      delete (dataToSave as any).id;
      await setDoc(docRef, dataToSave);

    } catch (error) {
      console.error(`Erro ao atualizar (PUT) documento ${id} em ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * (DELETE) Remove um documento
   */
  async delete(collectionName: string, id: string): Promise<void> {
    try {
      const docRef = doc(this.db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Erro ao deletar documento ${id} de ${collectionName}:`, error);
      throw error;
    }
  }
}