import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Icategory } from '../../models/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  cats: Icategory[] = [];

  Object = Object;

  catsObj: Icategory = {
    catId:'',
    Subcategories:{
        subcatId:'',
        id:'',
        name:'',
    },
    description:'',
    name:'',
    url:''
  };
  

  constructor(private router: Router, private data: CategoriesService) {
    this.getAllCategories();
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.data.getAllcat().subscribe(
      (cats) => {
        this.cats = cats as Icategory[];
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  resetForm() {
    this.catsObj={
        catId:'',
        Subcategories:{
            subcatId:'',
            id:'',
            name:'',
        },
        description:'',
        name:'',
        url:''
    }
  }
  addCat() {
    this.data.addCat(this.catsObj);
    this.resetForm();

  }

  updateCat(id: string, cat: Icategory): void {
    this.catsObj = { ...cat };

    this.router.navigate(['/edit-cat', id, cat]);
  }

  deleteCat(catId: string): void {
    if (confirm('Are you sure you want to delete this catigory?')) {
      this.data.deleteCat(catId)
        .then(() => {
          console.log('category deleted successfully');
          this.getAllCategories();
        })
        .catch((error) => {
          console.error('Error deleting category:', error);
        });
    }
  }


}
