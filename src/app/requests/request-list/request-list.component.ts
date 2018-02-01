import { Component, OnInit } from '@angular/core';

import { RequestService } from '../shared/request.service';
import { ClientService } from '../../clients/shared/client.service';
import { ProductService } from '../../products/shared/product.service';

import { Request } from '../shared/request.model';
import { Client } from '../../clients/shared/client.model';
import { Product } from '../../products/shared/product.model';


@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  requestList: Request[];
  clientList: Client[];
  productList: Product[];
  constructor(private requestService: RequestService,
              private clientService: ClientService,
              private productService: ProductService) { }

  ngOnInit() { 

    // busca valores dos clients para tabela
    var data_client = this.clientService.getData();
    data_client.snapshotChanges().subscribe(item => {
      this.clientList = [];
      item.forEach(element => {
        var dataList = element.payload.toJSON();
        dataList['$key'] = element.key;
        this.clientList.push(dataList as Client);
      });
    });

    // busca valores dos produstos para tabela
    var data_product = this.productService.getData();
    data_product.snapshotChanges().subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        var dataList = element.payload.toJSON();
        dataList['$key'] = element.key;
        this.productList.push(dataList as Product);
      });
    });

    var data = this.requestService.getData();
    data.snapshotChanges().subscribe(item => {
      this.requestList = [];
      item.forEach(element => {
        var dataList = element.payload.toJSON();
        dataList['$key'] = element.key;
        this.requestList.push(dataList as Request);
      });
    });
  }

  onEdit(request: Request) { // Função seleciona pedidos para edição da lista.
    this.requestService.selectedRequest = Object.assign({}, request);
    this.clientService.selectedClient = Object.assign({}, this.clientList.find(x => x.$key === request.client_key));
    
    this.requestService.requestProductList = [];
    for(let key in request.products_key) {
      this.requestService.requestProductList.push(
        this.productList.find(x => x.$key === request.products_key[key])
      );
    }
  
  }

  onDelete(key: string) { // Função de remoção na lista
    if(confirm('Esta certo de que deve deletar esta entrada?') == true) {
      this.requestService.deleteRequest(key);
    }
  }

  setClientName(key: string) {
    return (this.clientList.find(x => x.$key === key)).name;
  }

}
