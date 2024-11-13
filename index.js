const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { PROPERTY, MESSAGES } = require('./data');

const clients = [];
const inactiveChats = new Set();
const awaitingChat = new Set(); // Track chats waiting for interest response
const haveInterest = 'Tem interesse em reservar? \n\nDigite 1 para sim e 2 para não.';
const waitALittle = 'Ok, aguarde para ser atendido.';
const optionsArray = new Array(0,1,2,3,4,5,6,7,8,9,10,11);
 
function temInteresseInativaOCHat(chat, chatid) {
    chat.sendMessage(haveInterest);
    awaitingChat.add(chatid); // Mark chat as waiting for interest response
}

// Function to handle the interest response and inactivate the chat
function handleWantToBook(chat, message, chatid) {
    if (message.body === '1') {
        chat.sendMessage(MESSAGES.WANT_PRICES);
        inactiveChatFunction(chatid);
    } else if (message.body === '2') {
        chat.sendMessage('Ok, obrigado pelo interesse. Se quiser continuar este chat, digite "Menu" para voltar ao menu principal.');
        inactiveChatFunction(chatid);
    } else {
        chat.sendMessage('Opção inválida! Digite 1 para sim ou 2 para não.');
    }
    console.log('tirando o chat da espera')
    awaitingChat.delete(chatid); // Clear interest state after handling response
}

// Inactivates the current chat
function inactiveChatFunction(chatid) {
    console.log('Inativando chat');
    inactiveChats.add(chatid);
}

// Initialize the client
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

    // Handle incoming messages
    
    // Add a small delay to ensure no cached events are fired
    setTimeout(() => {
        client.on('message', async (message) => {
        
            console.log(`Message received on ${clientName}:`, message.body);
            
            const chat = await message.getChat();
            const chatid = chat.id._serialized;
    
            // Check if chat is waiting for interest response
            if (awaitingChat.has(chatid)) {
                handleWantToBook(chat, message, chatid);
                return;
            }
            // Remove chat from inactive if "Menu" is received
            if(message.body.toLowerCase() === 'menu') {
                console.log('ativando: ', chatid)
                inactiveChats.delete(chatid);
            } 
            if (inactiveChats.has(chatid)) {
                return; // Ignore messages from inactive chats
            }
            // Send menu if an invalid option was selected
            if (!optionsArray.includes(parseInt(message.body))) {
                await chat.sendMessage(MESSAGES.GREETINGS)
                // await message.reply(MESSAGES.GREETINGS);
                return;
            }
            if (message.type === 'audio') {
                await chat.sendMessage('Áudio recebido, aguarde para ser atendido')
                return;
            }
    
            // Process message options
            switch (message.body) {
                case '1': 
                    await chat.sendMessage(MESSAGES.WANT_PRICES);
                    inactiveChats.add(chatid);
                    break;
                case '2': 
                    await chat.sendMessage(PROPERTY.GENERAL);
                    temInteresseInativaOCHat(chat, chatid);
                    break;
                case '3':
                    await chat.sendMessage(PROPERTY.ROOMS);
                    temInteresseInativaOCHat(chat, chatid);
                    break;
                case '4':
                    await chat.sendMessage(PROPERTY.ADDRESS);
                    temInteresseInativaOCHat(chat, chatid);
                    break;
                case '5':
                    await chat.sendMessage(PROPERTY.SCHEDULE);
                    temInteresseInativaOCHat(chat, chatid);
                    break;
                case '6':
                    await chat.sendMessage(PROPERTY.BREAKFAST);
                    temInteresseInativaOCHat(chat, chatid);
                    break;
                case '7':
                    await chat.sendMessage(PROPERTY.PAYMENTS);
                    temInteresseInativaOCHat(chat, chatid);
                    break;
                case '8':
                    await chat.sendMessage(PROPERTY.INSTA);
                    temInteresseInativaOCHat(chat, chatid);
                    break;
                case '9':
                case '10':
                case '11':
                    await chat.sendMessage(waitALittle);
                    inactiveChats.add(chatid);
                    break;
                default:
                    if (!isNaN(message.body)) {
                        await chat.sendMessage(`Opção inválida! Digite um número de 1 a ${optionsArray[optionsArray.length -1]}`);
                        inactiveChats.add(chatid);
                    }
                    break;
            }
        });
    }, 10000); // Adjust the delay time as necessary

    clients.push(client);
    client.initialize();
};

initializeClient(1);
module.exports = { initializeClient };
