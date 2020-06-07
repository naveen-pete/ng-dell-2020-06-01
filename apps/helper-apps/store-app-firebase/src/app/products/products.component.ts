import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private service: ProductsService) { }

  ngOnInit() {
    this.service.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.log('Get products failed.');
        console.log('Error:', error.message);
      }
    );
  }

  onDelete(productId) {
    if (confirm('Are you sure?')) {
      this.service.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter(p => p.id !== productId);
        },
        (error) => {
          console.log('Delete product failed.');
          console.log('Error:', error);
        }
      );
    }
  }
}
