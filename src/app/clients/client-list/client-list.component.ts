import { Component, OnInit } from '@angular/core';

import { ClientService } from '../shared/client.service';
import { Client } from '../shared/client.model';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clientList: Client[];
  constructor(private clientService: ClientService,
              private toastr: ToastrService) { }

  /**
   * Carrega a lista de clientes ao iniciar.
   */
  ngOnInit() {
    var data = this.clientService.getData();
    data.snapshotChanges().subscribe(item => {
      this.clientList = [];
      item.forEach(element => {
        var dataList = element.payload.toJSON();
        dataList['$key'] = element.key;
        this.clientList.push(dataList as Client);
      });
    });
  }

  onEdit(client: Client) { // Função seleciona cliente para edição da lista.
    this.clientService.selectedClient = Object.assign({}, client);
  }

  onDelete(key: string) { // Função de remoção na lista
    if(confirm('Esta certo de que deve deletar esta entrada?') == true) {
      this.clientService.deleteClient(key);
      this.toastr.warning('Removido com Sucesso', 'Registro de Cliente');
    }
  }

}
