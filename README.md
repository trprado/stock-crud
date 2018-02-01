# Stock-CRUD
Exemplo simples de utilização do Angular 5 e Firebase para criar um sistema de controle de estoque.

## O Sistema

O sistema é uma simples aplicação onde se cadastra o cliente, o produto e os pedidos.
Para o cliente foi pedido os seguintes campos:

- ID
- Nome
- Email
- Telefone

Para o produto foi pedido os seguintes campos:

- ID
- Nome
- Descrição
- Preço

Para o pedido é uma junção do ID do cliente com o ID do produto pedido.

## Firebase
Para este projeto foi utilizado o Firebase Realtime Database ao ínvez de um banco de dados relacional. No Firebase não existem tabelas, todos os dados são armazenados em JSON e sua sincronização é feita em tempo real.

No firebase não existem chaves ou chavez estrangeiras, o firebase sempre gera uma chave única no formato de string para cada nova entrada. Por padrão o angularfire2 entende que váriaveis iniciadas com `$key` são chaves e quando um novo registro for realizado ele vai gerar automaticamente uma chave única.

Como firebase é um banco de dados NoSQL, ele tem algumas funcionalidades diferentes, entre elas não possuir chaves estrangeiras.

A duas formas de se resolver este problema, a primeira seria adicionar cada pedido ao cliente, a outra e criar uma nova seção de pedidos e juntar o identificador do cliente com o identificador do produto. A escolha foi utilizar esta segunda, onde pedidos não estariam entrelaçados com os dados do cliente.

Para isto o JSON ficaria da seguinte forma:

```
'requests': {
    'chave_unica_do_pedido': {
        client_key: 'chave_unica_do_cliente'
        products_key: {
          0: 'chave_unica_do_produto'
          ...
        }
    },
    ...
}
```

Com isto, fica visvel que é possível criar uma relação entre cliente e produtos em um pedido. Ainda o pedido pode conter vários produtos, para simplificar não adicionei quantidades, mas poderia ser feito na forma de `{key: 'chave_unica_do_produto', amount: número_de_produtos_comprados}` ao invez de apenas uma chave para o produto.

## Requisitos

Para rodar este projeto é primeiramente necessário instalar o seguinte:
- nodejs
- npm
- angular-cli

Na pasta raiz do projeto, basta rodar em um terminal:

```bash
$ ng serve -o
```

Ele irá compilar os pacotes e depois abrir um navegador com a página carregada para se utilizar.

> **Observações**: Utilize esta aplicação apenas para estudo, ela contém apenas o básico para se estudar e compreender o funcionamento do angular com firebase.
