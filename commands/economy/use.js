/*Use items!
Tipo de items[
Roles-{criação, alteração, separação dos outros}
Pacotes de recursos no tribos-{pacatos dependentes também das percentagens dos armazéns}
Possibilidade de utilização de comandos
]*/
const commando = require('discord.js-commando');
const mySQL = require('mysql');
const con = mySQL.createConnection({
    host:'eu-cdbr-west-01.cleardb.com',
    user:'bbd94c36d1aea2',
    password:'11207567',
    database:'heroku_b9dfdc7d4733cdc'
})