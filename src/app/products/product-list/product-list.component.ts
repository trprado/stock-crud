import { Component, OnInit } from '@angular/core';

import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  constructor(private productService: ProductService,
              private toastr: ToastrService) { }

  /**
   * Carrega a lista de produtos ao iniciar.
   */
  ngOnInit() {
    var data = this.productService.getData();
    data.snapshotChanges().subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        var dataList = element.payload.toJSON();
        dataList['$key'] = element.key;
        this.productList.push(dataList as Product);
      });
    });
  }

  onEdit(product: Product) { // Função seleciona cliente para edição da lista.
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete(key: string) { // Função de remoção na lista
    if(confirm('Esta certo de que deve deletar esta entrada?') == true) {
      this.productService.deleteProduct(key);
      this.toastr.warning('Removido com Sucesso', 'Registro de Produto');
    }
  }

}
