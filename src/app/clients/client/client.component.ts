import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ClientService } from '../shared/client.service';
import { ToastrService, Toast } from 'ngx-toastr';
import { TextMaskModule } from 'angular2-text-mask';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public phone_mask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  constructor(private clientService: ClientService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(clientForm: NgForm) {
    if (clientForm.value.$key == null) {
      this.clientService.createClient(clientForm.value);
    }
    else {
      this.clientService.updateClient(clientForm.value);
    }

    this.resetForm(clientForm);
    this.toastr.success('Enviado com sucesso', 'Registro de Cliente');
  }

  resetForm(clientForm?: NgForm) {
    if (clientForm != null) {
      clientForm.reset();
    }
    this.clientService.selectedClient = {
      $key: null,
      name: '',
      email: '',
      fone: ''
    }
  }

}
