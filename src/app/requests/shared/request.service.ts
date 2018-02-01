import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Request } from './request.model';
import { Product } from '../../products/shared/product.model';

@Injectable()
export class RequestService {

  requestList: AngularFireList<any>;
  requestProductList: Array<Product> = new Array;
  selectedRequest: Request = new Request();
  constructor(private firebase: AngularFireDatabase) { }

  createRequest(request: Request) { // CREATE
    this.requestList.push({
      client_key: request.client_key,
      products_key: request.products_key
    });
  }

  getData() { // READ
    this.requestList = this.firebase.list('requests')
    return  this.requestList;
  }

  updateRequest(request: Request) { // UPDATE
    this.requestList.update(request.$key, {
      client_key: request.client_key,
      products_key: request.products_key
    });
  }

  deleteRequest($key: string) { // DELETE
    this.requestList.remove($key);
  }
}
