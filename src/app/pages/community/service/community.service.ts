import { Injectable, signal } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Community } from '../models/community.model';

@Injectable({ providedIn: 'root' })
export class CommunityService {
  private collection: any;
  public communityList = signal<Community[]>([]);

  constructor(private firestore: Firestore) {
    this.collection = collection(this.firestore, 'communities');
  }

  async loadCommunityList(): Promise<void> {
    collectionData(this.collection, { idField: 'id' }).subscribe((data: any[]) => {
      const communities = data.map(item => Community.fromFirestore(item, item.id));
      this.communityList.set(communities);
    });
  }

  async createCommunity(community: Community): Promise<void> {
    const id = doc(collection(this.firestore, 'communities')).id;
    community.id = id;
    await setDoc(doc(this.firestore, `communities/${id}`), community.toFirestore());
  }

  async updateCommunity(community: Community): Promise<void> {
    await setDoc(doc(this.firestore, `communities/${community.id}`), community.toFirestore(), { merge: true });
  }

  async deleteCommunity(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, `communities/${id}`));
  }
}