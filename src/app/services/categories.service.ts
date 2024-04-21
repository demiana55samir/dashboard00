import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {  Observable } from 'rxjs';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private firestore: AngularFirestore) {}

  getCat(){
    return this.firestore
      .collection('categories')
      .valueChanges({ idField: 'catId' });
  }

  getCategory(catId: string): Observable<any> {
    return this.firestore.collection('categories')
    .doc(catId).valueChanges();
  }

  getAllCategories() {
    return this.firestore.collection('categories').snapshotChanges();
  }
  getAllcat(): Observable<Icategory[]> {
    return this.firestore.collection<Icategory>('categories').valueChanges();
  }
  addCat(cat: Icategory) {
    cat.catId = this.firestore.createId();
    return this.firestore.collection('categories').doc(cat.catId).set(cat);
  }
  async updateCat(catId: string, cat: any): Promise<void> {
    return this.firestore
      .collection(`categories`)
      .doc(catId)
      .update(cat);
  }

  async deleteCat(catId: string) {
    await this.firestore.collection('categories').doc(catId).delete();
  }
}
