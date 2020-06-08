import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(this.handleError('getProducts()'))
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError(`getProduct() id=${id}`))
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      catchError(this.handleError('addProduct()'))
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product).pipe(
      catchError(this.handleError(`updateProduct() id=${id}`))
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError(`deleteProduct() id=${id}`))
    );
  }

  private handleError(operation = 'operation') {
    return (error: any) => {
      // TODO: send the error to remote logging infrastructure
      console.error('Error:', error); // log to console instead

      // TODO: better job of transforming error for user consumption
      const appError = new Error(`${operation} failed: ${error.message}`);
      return throwError(appError);
    };
  }
}
