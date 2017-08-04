const commando = require('discord.js-commando');

var x1;
var x2;
var y1;
var y2;
var distancia;
var unidade;
var tempo;
var data;



class PlannerCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'planner',
            group: 'tribos',
            memberName: 'planner',
            description: 'Calcula o tempo que demora um determinada unidade a chegar à aldeia destino apartir da aldeia definida. As unidades são chamadas da seguinte forma: Lanceiros: lanceiro; Espadachins: espadachins; Vikings: vikings; Batedores: batedore; Cavalaria Leve: leve; Arqueiros a Cavalo: arqueiromontado; Cavalira Pesada: pesada; Arietes: ariete; Catapultas: catapulta; Nobre: nobre; Paladinho:paladino. Exemplo de uso:"!planner 100 200 300 400 nobre".'

        })
    }
    async run(message, args) {
        args = message.content.split(/\s+/g);

        x1 = args[1];
        x2 = args[3];
        y1 = args[2];
        y2 = args[4];
        unidade = args[5];

        distancia = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

        switch (unidade) {
            case 'lanceiro':
                tempo = distancia * 18;
                break;
            case 'espadachim':
                tempo = distancia * 22;
                break;
            case 'viking':
                tempo = distancia * 18;
                break;
            case 'arqueiro':
                tempo = distancia * 18;
                break;
            case 'batedor':
                tempo = distancia * 9;
                break;
            case 'leve':
                tempo = distancia * 10;
                break;
            case 'aquereiromontado':
                tempo = distancia * 10;
                break;
            case 'pesada':
                tempo = distancia * 11;
                break;
            case 'ariete':
                tempo = distancia * 30;
                break;
            case 'catapulta':
                tempo = distancia * 30;
                break;
            case 'nobre':
                tempo = distancia * 35;
                break;
            case 'paladino':
                tempo = distancia * 10;
                break;
            default:
                tempo = 0;
                break;
        }
        if (tempo !== 0) {


            var horas = Math.floor(tempo / 60);
            var minutos = Math.floor(((tempo / 60) - horas) * 60);
            var segundos = Math.floor(((((tempo / 60) - horas) * 60) - minutos) * 60);
            var milesimosDeSegundo = Math.floor(((((((tempo / 60) - horas) * 60) - minutos) * 60) - segundos) * 1000);
            var horas2
            var segundos2
            var minutos2
            var milesimos2
            milesimos2 = Math.abs(0 - milesimosDeSegundo);

            segundos2 = Math.abs(0 - segundos);
            minutos2 = Math.abs(1 - minutos);

            if(horas=0){
                horas2 = 7;
            }else{
                horas2 = Math.abs(8 - horas);
            }

            var dias = 0;
            while (milesimos2 > 999) {
                milesimos2 = milesimos2 - 1000;
                segundos2++;

            }

            while (segundos2 > 59) {
                segundos2 = segundos2 - 60;
                minutos2++;

            }

            while (minutos2 > 59) {
                minutos2 = minutos2 - 60;
                horas2++;

            }

            while (horas2 > 24) {

                horas2 = horas2 - 24;
                dias++;

            }




            var d = new Date();
            var dia = d.getDay();
            var hora = d.getHours();
            if (hora > 12) {
                dia = dia - 1;
            }

            var diaDeEnvio = dia;
            if (horas > 24) {
                diaDeEnvio = dia + 1;
            } else if (horas == 0) {
                if (hora > 8) {
                    diaDeEnvio = dia + 1;
                } else {
                    diaDeEnvio = dia;
                }
            }else{
                diaDeEnvio= dia +1;
            }
            var diaABater = dia + dias;

            message.channel.send('O ataque com ' + unidade + ' demorará ' + horas + ':' + minutos + ':' + segundos + ':' + milesimosDeSegundo + '.');

            message.channel.send('Para que este chegue ao destino às 8:01 mais próximas( Dia: ' + diaABater + '), este deverá ser enviado às ' + horas2 + ':' + minutos2 + ':' + segundos2 + ':' + milesimos2 + ' do dia ' + diaDeEnvio);
        } else {
            message.channel.send('Unidade especificada inexistente, use !help para ajuda.');
        }

    }
}
module.exports = PlannerCommand;
