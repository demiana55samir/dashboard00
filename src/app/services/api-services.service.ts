import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Iproduct } from '../models/iproducts';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore : AngularFirestore) { }

  getProducts(): Observable<any[]> {
    return this.firestore.collection('products').valueChanges({ idField: 'productId' });
  }

  getProduct(productId: string): Observable<any> {
    return this.firestore.doc(`products/${productId}`).valueChanges();
  }

  addProduct(product :Iproduct){
    product.id = this.firestore.createId();
    return this.firestore.collection('/products').add(product);
 }
  updateProduct(productId: string, product: any): Promise<void> {
    return this.firestore.doc(`products/${productId}`).update(product);
  }

  deleteProduct(productId: string): Promise<void> {
    return this.firestore.doc(`products/${productId}`).delete();
  }
}
