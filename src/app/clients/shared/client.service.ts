import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Client } from './client.model';

@Injectable()
export class ClientService {

  clientList: AngularFireList<any>;
  selectedClient: Client = new Client();
  constructor(private firebase: AngularFireDatabase) { }

  createClient(client: Client) { // CREATE
    this.clientList.push({
      name: client.name,
      email: client.email,
      fone: client.fone
    });
  }

  getData() { // READ
    this.clientList = this.firebase.list('clients');
    return this.clientList;
  }

  updateClient(client: Client) { // UPDATE
    this.clientList.update(client.$key, {
      name: client.name,
      email: client.email,
      fone: client.fone
    });
  }

  deleteClient($key: string) { // DELETE
    this.clientList.remove($key);
  }
  
}
