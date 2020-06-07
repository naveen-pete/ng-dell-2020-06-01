import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  id: string;
  product: Product;
  addNew: boolean;
  @ViewChild('f', { static: false }) productForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductsService
  ) {
    this.product = new Product();
    this.addNew = true;
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(map => {
          this.id = map.get('id');
          return this.service.getProduct(this.id);
        })
      ).subscribe(
        (product: Product) => {
          if (product) {
            this.product = product;
            this.addNew = false;
          }
        },
        (error) => {
          console.log('Get product failed.');
          console.log('Error:', error);
        }
      );
  }

  onSubmit() {
    this.product.name = this.productForm.value.name;
    this.product.description = this.productForm.value.description;
    this.product.price = +this.productForm.value.price;
    this.product.isAvailable = this.productForm.value.isAvailable
      ? this.productForm.value.isAvailable
      : false;

    if (this.addNew) {
      this.service.addProduct(this.product).subscribe(
        () => {
          this.router.navigate(['/products']);
        },
        (error) => {
          console.log('Add product failed.');
          console.log('Error:', error);
        }
      );
    } else {
      this.service.updateProduct(this.id, this.product).subscribe(
        (product) => {
          console.log('product:', product);
          this.router.navigate(['/products']);
        },
        (error) => {
          console.log('Update product failed.');
          console.log('Error:', error);
        }
      );
    }

  }
}
