import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isAuthenticated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: ProductsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isLoggedIn;

    this.route.data.subscribe(
      ({ products }) => this.products = products
    );
  }

  onDelete(productId: number) {
    if (confirm('Are you sure?')) {
      this.service.deleteProduct(productId).subscribe(
        () => this.products = this.products.filter(p => p.id !== productId),
        error => {
          console.log('Delete product failed.');
          console.log('Error:', error.message);
        }
      );
    }
  }
}
