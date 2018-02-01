import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RequestService } from '../shared/request.service';
import { ClientService } from '../../clients/shared/client.service';
import { ProductService } from '../../products/shared/product.service';
import { ToastrService, Toast } from 'ngx-toastr';

import { Client } from '../../clients/shared/client.model';
import { Product } from '../../products/shared/product.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  clientList: Client[];
  productList: Product[];
  // requestProductList: Product[];
  constructor(private requestService: RequestService,
              private clientService: ClientService,
              private productService: ProductService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();

    // inicia lista de produtos do pedido
    this.requestService.requestProductList = new Array();

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
  }

  onSubmit(requestForm: NgForm) {

    var productsKeys: string[] = [];
    this.requestService.requestProductList.forEach(product => {
      productsKeys.push(product.$key);
    });
    requestForm.value.products_key = productsKeys;

    if (requestForm.value.$key == null) {
      this.requestService.createRequest(requestForm.value);
    }
    else {
      this.requestService.updateRequest(requestForm.value);
    }

    this.resetForm(requestForm);
    this.toastr.success('Enviado com sucesso', 'Registro de Cliente');
  }

  resetForm(requestForm?: NgForm) {
    if (requestForm != null) {
      requestForm.reset();
      this.requestService.requestProductList = [];
    }
    this.requestService.selectedRequest = {
      $key: null,
      client_key: '',
      products_key: null
    }
  }

  onSelectedClient(client: Client) {
    this.clientService.selectedClient = Object.assign({}, client);
  }

  onAddProduct(product: Product) {
    this.productService.selectedProduct = Object.assign({}, product);
    this.requestService.requestProductList.push(this.productService.selectedProduct as Product);
  }

  onDeleteProduct(key: string) { // Função de remoção na lista
    if(confirm('Esta certo de que deve deletar esta entrada?') == true) {
      var index = this.requestService.requestProductList.findIndex(product => product.$key === key);
      this.requestService.requestProductList.splice(index, 1);
    }
  }

}
