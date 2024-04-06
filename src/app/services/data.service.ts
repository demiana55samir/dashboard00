import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Iproduct } from '../models/iproducts';
import { IAdmins } from '../models/iAdmins';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: AngularFirestore) {}

  getProducts(): Observable<any[]> {
    return this.firestore
      .collection('products')
      .valueChanges({ idField: 'productId' });
  }

  getProduct(productId: string): Observable<any> {
    return this.firestore.collection('/products').doc(productId).valueChanges();
  }

  getAllProucts() {
    return this.firestore.collection('/prducts').snapshotChanges();
  }
  getAllProducts(): Observable<Iproduct[]> {
    return this.firestore.collection<Iproduct>('/products').valueChanges();
  }
  addProduct(product: Iproduct) {
    product.id = this.firestore.createId();
    return this.firestore.collection('/products').doc(product.id).set(product);
  }
  async updateProduct(productId: string, product: any): Promise<void> {
    return this.firestore
      .collection(`/products`)
      .doc(productId)
      .update(product);
  }

  async deleteProduct(productId: string) {
    await this.firestore.collection('/products').doc(productId).delete();
  }

  /***************************************/
  addAdmin(admin: IAdmins) {
    admin.id = this.firestore.createId();
    return this.firestore.collection('/admins').add(admin);
  }

  getAllAdmins() {
    return this.firestore.collection('/admins').snapshotChanges();
  }

  deleteAdmin(admin: IAdmins) {
    return this.firestore.doc('/admins' + admin.id).delete();
  }

  updateAdmin(admin: IAdmins) {
    return this.firestore.doc('/products' + admin.id).update(admin);
  }

  getAdmin(id: string) {
    return this.firestore.doc('/admins' + id).valueChanges();
  }
}
