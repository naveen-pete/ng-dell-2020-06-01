import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(private service: ProductsService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Product[] | Observable<Product[]> | Promise<Product[]> {

    return this.service.getProducts().pipe(
      catchError(error => {
        console.log('Error:', error.message);
        this.router.navigateByUrl('/');
        return EMPTY;
      })
    );

  }
}
