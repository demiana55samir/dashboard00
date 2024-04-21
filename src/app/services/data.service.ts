import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Iproduct } from '../models/iproducts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: AngularFirestore) {}

  getProducts(): Observable<any[]> {
    return this.firestore
      .collection('products')
      .valueChanges({ idField: 'proId' });
  }

  getProduct(proId: string): Observable<any> {
    console.log(proId);
    return this.firestore.collection('products')
    .doc(proId).valueChanges();
  }

  getAllProucts() {
    return this.firestore.collection('prducts').snapshotChanges();
  }
  getAllProducts(): Observable<Iproduct[]> {
    return this.firestore.collection<Iproduct>('products').valueChanges();
  }
  addProduct(product: Iproduct) {
    product.proId = this.firestore.createId();
    return this.firestore.collection('products').doc(product.proId).set(product);
  }
  async updateProduct(proId: string, product: any): Promise<void> {
    return this.firestore
      .collection(`/products`)
      .doc(proId)
      .update(product);
  }

  async deleteProduct(proId: string) {
    await this.firestore.collection('/products').doc(proId).delete();
  }
}
