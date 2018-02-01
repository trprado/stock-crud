import { Component, OnInit } from '@angular/core';

import { RequestService } from './shared/request.service';
import { ClientService } from '../clients/shared/client.service';
import { ProductService } from '../products/shared/product.service';

import { Client } from '../clients/shared/client.model';
import { Product } from '../products/shared/product.model';
import { Request } from './shared/request.model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css'],
  providers: [
    RequestService,
    ClientService,
    ProductService
  ]
})
export class RequestsComponent implements OnInit {

  constructor(private requestService: RequestService,
              private clientService: ClientService,
              private productService: ProductService) { }

  ngOnInit() {
  }

}
