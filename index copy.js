const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { PROPERTY, MESSAGES } = require('./data');

const clients = [];
const inactiveChats = new Set();
const haveInterest = 'Tem interesse em reservar? \n\nDigite 1 para sim e 2 para não.';
const waitALittle = 'Obrigado pelo interesse. Aguarde para ser atendido.';
const optionsArray = new Array(0,1,2,3,4,5,6,7,8,9,10);
 
function temInteresseInativaOCHat(chat, message, chatid) {
    chat.sendMessage(haveInterest);
    console.log(message.body)

    // i have a problem here. the message.body comes from the general message recevied in switch case 3 not the condition below.
    if (message.body === '1') {
        console.log(message.body, '1')
        console.log('quero reservar')
        chat.sendMessage(MESSAGES.WANT_PRICES);
        inactiveChatFunction(message, chatid);
        return;
    } else {
        console.log(message.body, '2')
        console.log('NÃO quero reservar')
        chat.sendMessage('Ok, obrigado pelo interesse. Se quiser continuar este chat, digite "Menu" para voltar ao menu principal.');
        inactiveChatFunction(message, chatid);
        return;
    }
}

// inativa o chat atual
function inactiveChatFunction(message, chatid) {
    console.log('inativando chat')
    inactiveChats.add(chatid);
}

// inicializa todo o client
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

    // quando o client recebe a mensagem
    client.on('message', async (message) => {
        console.log(`Message received on ${clientName}:`, message.body);
        
        const chat = await message.getChat();
        const chatid = chat.id._serialized;
        
        if(message.body.toLowerCase() === 'menu') {
            console.log('ativando: ', chatid)
            inactiveChats.delete(chatid);
        } 
        if (inactiveChats.has(chatid)) {
            console.log('chat inativo: ',inactiveChats.has(chatid));
            return;
        }

        // após verificar se a mensagem não contém ativar, verificar se o chat deve ser ignorado por ser inativo, o client menvia o menu
        if (!optionsArray.includes(parseInt(message.body))) {
            console.log('NAO ESCOLHEU OPCAO DO MENU')
            await message.reply(MESSAGES.GREETINGS);
        }

        switch (message.body) {
            // pergunta data e quantidade de pessoas e inativa o chat
            case '1': 
                await chat.sendMessage(MESSAGES.WANT_PRICES);
                // enviar um calendario
                // perguntar quantos adultos
                // perguntar quantas crianças. Se tiver, qual idade
                
                console.log('inativando chat');
                inactiveChats.add(chatid);
                break;
            // envia infos e fotos da pousada e pergunta se tem interesse em reservar, se sim inativa o chat
            case '2': 
                await chat.sendMessage(PROPERTY.GENERAL);
                // enviar fotos
                temInteresseInativaOCHat(chat, message, chatid);
                break;
            // envia infos e fotos dos quartos e pergunta se tem interesse em reservar, se sim inativa o chat
            case '3':
                await chat.sendMessage(PROPERTY.ROOMS);
                temInteresseInativaOCHat(chat, message, chatid);
                break;
            // envia o endereço e pergunta se tem interesse em reservar, se sim inativa o chat
            case '4':
                await chat.sendMessage(PROPERTY.ADDRESS);
                temInteresseInativaOCHat(chat, message, chatid);
                break;
            // envia horários de checkin/ checkout e pergunta se tem interesse em reservar, se sim inativa o chat
            case '5':
                await chat.sendMessage(PROPERTY.SCHEDULE);
                temInteresseInativaOCHat(chat, message, chatid);
                break;
            // envia infos de café da manhã e pergunta se tem interesse em reservar, se sim inativa o chat
            case '6':
                await chat.sendMessage(PROPERTY.BREAKFAST);
                temInteresseInativaOCHat(chat, message, chatid);
                break;
            // envia formas de pagto e pergunta se tem interesse em reservar, se sim inativa o chat
            case '7':
                await chat.sendMessage(PROPERTY.PAYMENTS);
                temInteresseInativaOCHat(chat, message, chatid);
                break;
            // envia redes sociais e pergunta se tem interesse em reservar, se sim inativa o chat
            case '8':
                await chat.sendMessage(PROPERTY.INSTA);
                temInteresseInativaOCHat(chat, message, chatid);
                break;
            // Pede para aguardar o atendimento
            case '9':
                await chat.sendMessage(waitALittle);
                inactiveChats.add(chatid);
                break;
            // Pede para aguardar o atendimento
            case '10':
                await chat.sendMessage(waitALittle);
                inactiveChats.add(chatid);
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

module.exports = { initializeClient };
