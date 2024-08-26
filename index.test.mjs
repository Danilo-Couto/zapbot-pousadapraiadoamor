import { expect } from 'chai';
import { before } from 'mocha';
import sinon from 'sinon';
import pkg from 'whatsapp-web.js';
const { Client } = pkg;

describe('WhatsApp Client Initialization', async function() {
    const client = new Client();
    const qrCallback = sinon.spy();

    before(async function() {
        this.timeout(25000);
        client.on('qr', qrCallback);
        await client.initialize();  
        await new Promise(resolve => setTimeout(resolve, 5000));
    });

    after(async function() {
        await client.destroy();
    });

    it('should emit QR code when not authenticated', async function() {
        expect(qrCallback.called).to.be.true;

    });
});
