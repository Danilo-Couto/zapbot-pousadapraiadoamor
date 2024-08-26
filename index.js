const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { PROPERTY, MESSAGES } = require('./data');

const clients = [];
const inactiveChats = new Set();

const haveInterest = '\n\n Tem interesse em saber preços? \n\n Digite 1 para sim e 2 para não.';

const waitALittle = 'Aguarde para ser atendido.';

const optionsArray = new Array(0,1,2,3,4,5,6,7,8,9,10);

function inactiveChatFunction(message, chatid) {
    message.reply(PROPERTY.WANT_PRICES);
    console.log('inativando chat')
    inactiveChats.add(chatid);
}

const initializeClient = (clientName) => {
    const client = new Client({
        authStrategy: new LocalAuth({ clientId: clientName })
    });

    client.on('qr', (qr) => {
        console.log(`QR Code for ${clientName}:`);
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log(`${clientName} is ready!`);
    });

    client.on('message', async (message) => {
        console.log(`Message received on ${clientName}:`, message.body);
        
        const chat = await message.getChat();
        const chatid = chat.id._serialized;
        
        if(message.body.toLowerCase() === 'ativar') {
            console.log('ativando: ', chatid)
            inactiveChats.delete(chatid);
        } 
        if (inactiveChats.has(chatid)) {
            console.log('chat inativo: ',inactiveChats.has(chatid));
            return;
        }
        if (!optionsArray.includes(parseInt(message.body))) {
            console.log('NAO INCLUI OPCAO')
            await message.reply(MESSAGES.GREETINGS);
        }

        switch (message.body) {
            case '1':
                await chat.sendMessage('Você escolheu a opção 1.\n\n' + MESSAGES.WANT_PRICES);
                console.log('inativando chat');
                inactiveChats.add(chatid);
                break;
            case '2':
                await chat.sendMessage('Você escolheu a opção 2.\n\n' + PROPERTY.GENERAL + haveInterest);
                if (message.body === '1') {
                    inactiveChatFunction(message, chatid);
                }
                break;
            case '3':
                await chat.sendMessage('Você escolheu a opção 3.\n\n' + PROPERTY.ADDRESS + haveInterest);
                if (message.body === '1') {
                    inactiveChatFunction(message, chatid);
                }
                break;
            case '4':
                await chat.sendMessage('Você escolheu a opção 4.\n\n' + PROPERTY.ROOMS + haveInterest);
                if (message.body === '1') {
                    inactiveChatFunction(message, chatid);
                } 
                break;
            case '5':
                await chat.sendMessage('Você escolheu a opção 5.\n\n' + PROPERTY.SCHEDULE);
                break;
            case '6':
                await chat.sendMessage('Você escolheu a opção 6.\n\n' + PROPERTY.BREAKFAST);
                break;
            case '7':
                await chat.sendMessage('Você escolheu a opção 7.\n\n' + PROPERTY.PAYMENTS);
                break;
            case '8':
                await chat.sendMessage('Você escolheu a opção 8.\n\n' + PROPERTY.INSTA);
                break;
            case '9':
                await chat.sendMessage('Você escolheu a opção 9.\n\n' + waitALittle);
                break;
            case '10':
                await chat.sendMessage('Você escolheu a opção 10.\n\n' + waitALittle);
                break;
            default:
                if (!isNaN(message.body)) {
                    await chat.sendMessage('Opção inválida! Digite um número de 1 a 10.');
                    inactiveChats.add(chatid);
                }
                break;
        }
    });

    clients.push(client);

    client.initialize();
};

initializeClient(1); //toa toa
// initializeClient(2); //do amor
