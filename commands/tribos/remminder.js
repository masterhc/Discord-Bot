const commando = require('discord.js-commando');


    class remminderCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'remminder',
                group:'tribos',
                memberName: 'remminder',
                description: 'Este comando enviar-lhe-á um aviso quando faltarem 5 minutos para a hora pedida, outro exatamente na hora pedida. Pode escolher entre 3 tipos de aviso: 1 - "O seu ataque tem que ser enviado!" 2-"Aviso! Tem algo para fazer!" 3-"Considere-se relembrado." . Exemplo de uso !remminder 23:03:01 2 '

            })
        }
        async run(message, args){
     
        
        }

    }
    module.exports = remminderCommand;