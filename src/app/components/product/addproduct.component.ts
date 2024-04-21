import { Component } from '@angular/core';
import { Iproduct } from '../../models/iproducts';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddproductComponent {
  products: Iproduct[] = [];
  Object = Object;
  productObj: Iproduct = {
    id: '',
    ar: {
      brand: '',
      description: '',
      title: '',
    },
    categoryId: '',
    discountPercentage: 0,
    en: {
      brand: '',
      description: '',
      title: '',
    },
    images: [],
    proId: '',
    price: 0,
    quantityInStock: '',
    rating: {
      '': { 
        ReviewTitle: '',
        ReviewTitleDetail: '',
        date: '',
        name: '',
        rate: '',
      },
    },
    ratingQuantity: 0,
    sku: '',
    subCategoryId: '',
    thumbnail: '',
  };
  
  keys: string[] =[];

  constructor(private router: Router, private data: DataService) {
    this.getAllProducts();
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.data.getAllProducts().subscribe(
      (products) => {
        this.products = products as Iproduct[];
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  resetForm() {
    this.productObj = {
      id: '',
      ar: {
        brand: '',
        description: '',
        title: '',
      },
      categoryId: '',
      discountPercentage: 0,
      en: {
        brand: '',
        description: '',
        title: '',
      },
      images: [],
      proId: '',
      price: 0,
      quantityInStock: '',
      rating: {
        '': { 
          ReviewTitle: '',
          ReviewTitleDetail: '',
          date: '',
          name: '',
          rate: '',
        },
      },
      ratingQuantity: 0,
      sku: '',
      subCategoryId: '',
      thumbnail: '',
    };
  }
  addProduct() {
    this.data.addProduct(this.productObj);
    this.resetForm();

  }

  updateProduct(id: string, product: Iproduct): void {
    this.productObj = { ...product };

    this.router.navigate(['/edit-product', id, product]);
  }

  deleteProduct(proId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.data
        .deleteProduct(proId)
        .then(() => {
          console.log('product deleted successfully');
          this.getAllProducts();
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    }
  }

}
