const commando = require('discord.js-commando');
const discord = require('discord.js')

var x1;
var x2;
var y1;
var y2;
var distancia;
var unidade;
var tempo;
var data;
var horas 
var minutos
var segundos
var milesimosDeSegundo
var unidade2
var tempoforall = [];
class PlannerCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'planner',
            group: 'tribos',
            memberName: 'planner',
            description: 'Calcula o tempo que demora um determinada unidade a chegar à aldeia destino apartir da aldeia definida. As unidades são chamadas da seguinte forma: Lanceiros: lanceiro; Espadachins: espadachins; Vikings: vikings; Batedores: batedore; Cavalaria Leve: leve; Arqueiros a Cavalo: arqueiromontado; Cavalira Pesada: pesada; Arietes: ariete; Catapultas: catapulta; Nobre: nobre; Paladinho:paladino. Exemplo de uso:"!planner 100 200 300 400 nobre".',
            hidden:false
        })
        
    }
    async run(message, args) {
        args = message.content.split(/\s+/g);
            //definir as coordenadas
        if(args[1]!==null&&args[2]!==null||args[3]!==null&&args[4]!==null){
                    if(args[5]!==null){
                        x1 = args[1];
                        x2 = args[3];
                        y1 = args[2];
                        y2 = args[4];
                        unidade = args[5];
                        //calculo da distancia
                        distancia = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
                        //definir a unidade
                        switch (unidade) {
                           case 'lanceiro':
                                    tempo = distancia * 18;
                                    unidade2 ="spear"
                           break;
                           case 'espadachim':
                                    tempo = distancia * 22;
                                    unidade2 = "sword"
                           break;
                           case 'viking':
                                     tempo = distancia * 18;
                                     unidade2 = "axe"
                           break;
                            case 'arqueiro':
                                  tempo = distancia * 18;
                                  unidade2 = "archer"
                              break;
                            case 'batedor':
                              tempo = distancia * 9;
                              unidade2 = "spy"
                                break;
                              case 'leve':
                                    tempo = distancia * 10;
                                    unidade2 = "light"

                                break;
                             case 'aquereiromontado':
                                 tempo = distancia * 10;
                                 unidade2 = "marcher"
                              break;
                            case 'pesada':
                                  tempo = distancia * 11;
                                  unidade2 = "heavy"
                                 break;
                           case 'ariete':
                                   tempo = distancia * 30;
                                  unidade2 = "ram"
                              break;
                           case 'catapulta':
                                        tempo = distancia * 30;
                                  unidade2 = "catapult"                                        
                           break;
                            case 'nobre':
                                tempo = distancia * 35;
                                unidade2 = "snob"
                            break;
                            case 'paladino':
                            tempo = distancia * 10;
                            unidade2 = "knight"
                            break;
                                default:
                                    //Adicionar aqui para todas as unidades
                                   tempo = 0;
                                    tempoforall.push(distancia * 18) //lanceiro/viking/arqueiro
                                    tempoforall.push(distancia *22)  //espada
                                    tempoforall.push(distancia *9)   //spy
                                    tempoforall.push(distancia *10)  //leves/marcher/knight                                 
                                    tempoforall.push(distancia *11)  //heavy
                                    tempoforall.push(distancia *30)  //ram/catapult
                                    tempoforall.push(distancia *35)  //snob
                               break;
                            }
           if (tempo !== 0) {

            //calcular o tempo de viagem
                horas = Math.floor(tempo / 60);
                minutos = Math.floor(((tempo / 60) - horas) * 60);
                segundos = Math.floor(((((tempo / 60) - horas) * 60) - minutos) * 60);
                milesimosDeSegundo = Math.floor(((((((tempo / 60) - horas) * 60) - minutos) * 60) - segundos) * 1000);
            //Enviar o tempo que demora. Alterar isto para mandar apenas no fim
            //calcular a hora de envio
            var horas2
            var segundos2
            var minutos2
            var milesimos2

            milesimos2 = Math.abs(1000 - milesimosDeSegundo);

            segundos2 = Math.abs(59 - segundos);
            minutos2 = Math.abs(61 - minutos);

            if(horas!==0){
                 horas2 = Math.abs(8 - horas);
            }else{
               horas2 = 7; 
            }
            

            var dias =0;
        
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
                dias++
                            
            }


            var d = new Date();
         
            var dia = d.getDate();
            var hora = d.getHours();
            var minuto =d.getMinutes();
            var segundo =d.getSeconds();
            var milesmimo = d.getMilliseconds();

            var diaABater=0;
            var diaDeEnvio=0;
            //Definir o dia de envio e o dia de chegada. 
            if (dias==0){
               if(horas2<8&&horas2>0){
                   if(hora<8){
                       diaDeEnvio=dia;
                       diaABater=dia;
                       
                   }else{
                       diaDeEnvio=dia+1;
                       diaABater=diaDeEnvio;
                        
                   }
                }else{
                    if(hora<(24-horas2)){
                        diaDeEnvio=dia;
                        diaABater=dia+1;
                         
                    }else{
                        diaDeEnvio=dia+1;
                        diaAbater=dia+2;
                          
                    }
                }
            }else{
                if(horas2<8&&horas2>0){
                    if(hora<8){
                      diaDeEnvio=dia;
                     diaABater=dia+dias;
                     
                    }else if(horas2>8){
                     diaDeEnvio=dia+1;
                     diaABater= diaDeEnvio+dias;
                    }
                }else{
                    if(hora<(24-horas2)){
                        diaDeEnvio=dia;
                        diaABater=dia+dias;
                        

                    }else{
                        diaDeEnvio=dia+1;
                        diaABater=diaDeEnvio+dias;
                        
                    }   
                }
              
            }
        //Acerto Horário
        if(segundos2+segundos>0&&segundos2+segundos<60){
            minutos2--;
        }else if(segundos2+segundos>60){
            minutos2--;
           
        }
        if(minutos2+minutos>1){
            horas2--; 
        }            
        //Apresentação das Horas
        
        if(segundos2<10){ 
                segundos2='0'+segundos2;
        }
        
        if(minutos2<10){
            minutos2='0'+minutos2;
        }
       
        if(horas2<10){
            horas2='0'+horas2;
        }
        
        let embed = new Discord.RichEmbed()
        embed.setColor(0xb50000);
        embed.setDescription('Para que este chegue ao destino às 8:01 mais próximas( Dia: ' + diaABater + '), este deverá ser enviado às ' + horas2 + ':' + minutos2 + ':' + segundos2 + ':' + milesimos2 + ' do dia ' + diaDeEnvio+'.');
        embed.setTitle('O ataque com ' + unidade + ' demorará ' + horas + ':' + minutos + ':' + segundos + ':' + milesimosDeSegundo + '.');
        embed.setImage(`http://dspt.innogamescdn.com/asset/6f680fef/graphic/unit/unit_${unidade2}.png`);
        embed.addField('Para que este chegue ao destino às 8:01 mais próximas( Dia: ' + diaABater + '), este deverá ser enviado às ' + horas2 + ':' + minutos2 + ':' + segundos2 + ':' + milesimos2 + ' do dia ' + diaDeEnvio+'.')
        embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
        embed.setTimestamp();

        message.channel.send({embed}) 
        
           }else {
            embed.setColor(0xb50000);
            embed.setTitle('Unidade não especificada.');           
            embed.addField('Lanceiro/Viking/Arqueiro', horasdecentes(tempoforall[0]))
            embed.addField('Espadas', horasdecentes(tempoforall[1]))
            embed.addField('Batedores', horasdecentes(tempoforall[2]))
            embed.addField('Cavalaria Leve/ Arqueiros a Cavalo / Paladino', horasdecentes(tempoforall[3]))
            embed.addField('Cavalaria Pesada', horasdecentes(tempoforall[4]))
            embed.addField('Aríete / Catapulta', horasdecentes(tempoforall[5]))
            embed.addField('Nobre', horasdecentes(tempoforall[6]))
            embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
            embed.setTimestamp();
    
            message.channel.send({embed}) 
        }
         }else{
             message.channel.send('Verifique como usar o comando. Escreva !help.');

        } 
                    
        }
    }
}module.exports = PlannerCommand;
function horasdecentes(tempo){
        let horas = Math.floor(tempo / 60);
        let minutos = Math.floor(((tempo / 60) - horas) * 60);
        let segundos = Math.floor(((((tempo / 60) - horas) * 60) - minutos) * 60);
        let milesimosDeSegundo = Math.floor(((((((tempo / 60) - horas) * 60) - minutos) * 60) - segundos) * 1000);
        return horasdecentes = horas+":"+minutos+":"+segundos+":"+milesimosDeSegundo    
    }