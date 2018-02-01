import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Product } from './product.model';

@Injectable()
export class ProductService {

  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();
  constructor(private firebase: AngularFireDatabase) { }

  createProduct(product: Product) { // CREATE
    this.productList.push({
      name: product.name,
      description: product.description,
      price: product.price
    });
  }

  getData() { // READ
    this.productList = this.firebase.list('products');
    return this.productList;
  }

  updateProduct(product: Product) { // UPDATE
    this.productList.update(product.$key, {
      name: product.name,
      description: product.description,
      price: product.price
    });
  }

  deleteProduct($key: string) { // DELETE
    this.productList.remove($key);
  }

}
