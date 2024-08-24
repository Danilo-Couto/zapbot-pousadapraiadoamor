const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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
    });

    client.initialize();
};

initializeClient(1); //toa toa
initializeClient(2); //do amor
