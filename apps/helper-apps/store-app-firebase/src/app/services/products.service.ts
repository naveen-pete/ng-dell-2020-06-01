import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from "../../environments/environment";
import { Product } from '../models/product';

@Injectable()
export class ProductsService {
  private apiUrl = `${environment.dbApiUrl}/products`;
  private token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGUuY29tLyIsImF1ZCI6ImFuZ3VsYXItYXBwcy03Yjk1MSIsImlhdCI6MTU5MTI5NzAzMywiZXhwIjoxNTkyNTA2NjMzLCJ1c2VyX2lkIjoiMzZjQjRJWkRWaE81SXp6cEZDaWY5cXg3VzFzMiIsImVtYWlsIjoiaGFyaUBhYmMuY29tIiwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIiwidmVyaWZpZWQiOmZhbHNlfQ.b85JqE_fZQeqzugtC9WZcJGCcgXbfzL908E4y7nyLt2q8eWTpWfGCqgwusg4p_2U9ZUHxtjqg1LjbqwTPNhkgmzBs7AnXssxHRrKZ5LrFE98NI6sVZLeNpZx8VlfnXBUt17y6jy5folyJyTkjPZsHgk9m9FSOyt5Lnrah_SKJtHUPj5AxXtR1KPWqWj5VIroqPOejCJUykYLpfc3qS_CWhTUCgo03AN3Xk774yK2yRZTWzFXr4xTlZM_FKZPWybZKTwu8MliPgYf4uSl4CWbEc7uTgUZv0Uuwq18RBegfP6YHoSHlio3h-2yyZgc7VLOs9wGjJf2C5L4Z0cyTcDrnA';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}.json`)
      .pipe(

        map(response => {
          const products: Product[] = [];
          Object.keys(response).forEach(key => {
            const { name, description, isAvailable, price } = response[key];
            products.push({
              id: key,
              name,
              description,
              isAvailable,
              price
            });
          });

          return products;
        })

      );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}.json`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}.json`, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}.json`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}.json`);
  }
}
