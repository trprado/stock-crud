import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProductService } from '../shared/product.service';
import { ToastrService, Toast } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(productForm: NgForm) {
    if (productForm.value.$key == null) {
      this.productService.createProduct(productForm.value);
    }
    else {
      this.productService.updateProduct(productForm.value);
    }

    this.resetForm(productForm);
    this.toastr.success('Enviado com sucesso', 'Registro de Produto');
  }

  resetForm(productForm?: NgForm) {
    if (productForm != null) {
      productForm.reset();
    }
    this.productService.selectedProduct = {
      $key: null,
      name: '',
      description: '',
      price: null
    }
  }

}
