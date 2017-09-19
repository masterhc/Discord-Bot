//Para passar dinheiro entre users
const commando = require('discord.js-commando');
const mySQL = require('mysql');
const moment = require('moment');
const con = mySQL.createConnection({
    host:'eu-cdbr-west-01.cleardb.com',
    user:'bbd94c36d1aea2',
    password:'11207567',
    database:'heroku_b9dfdc7d4733cdc'
})