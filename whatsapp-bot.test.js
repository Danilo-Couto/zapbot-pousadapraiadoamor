const { Client } = require('whatsapp-web.js');
const { initializeClient } = require('./'); // Path to your client file
const { PROPERTY, MESSAGES } = require('./data'); // Your data file

// jest.mock('whatsapp-web.js');

// describe('WhatsApp Client Initialization', () => {
//     let clientMock;

//     beforeEach(() => {
//         clientMock = new Client();
//         Client.mockImplementation(() => clientMock);
//     });

//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should initialize the client and display QR code', () => {
//         const spyGenerate = jest.spyOn(clientMock, 'on');
        
//         initializeClient('testClient');

//         expect(spyGenerate).toHaveBeenCalledWith('qr', expect.any(Function));
//     });

//     // it('should handle message event and reply based on input', async () => {
//     //     const sendMessageSpy = jest.fn();
//     //     const message = {
//     //         body: '1',
//     //         getChat: jest.fn().mockResolvedValue({
//     //             id: { _serialized: 'chat_id' }
//     //         }),
//     //         reply: jest.fn()
//     //     };

//     //     clientMock.on.mockImplementation((event, callback) => {
//     //         if (event === 'message') {
//     //             callback(message);
//     //         }
//     //     });

//     //     clientMock.sendMessage = sendMessageSpy;
//     //     initializeClient('testClient');

//     //     await new Promise(resolve => setImmediate(resolve));

//     //     expect(sendMessageSpy).toHaveBeenCalledWith('chat_id', 'Você escolheu a opção 1.\n\n' + MESSAGES.WANT_PRICES);
//     // });

//     it('should handle message event and reply based on input', async () => {
//       // Mock message data
//       const message = {
//         body: '1',
//         getChat: jest.fn().mockResolvedValue({
//           id: { _serialized: '1' },
//         }),
//         reply: jest.fn(),
//       };
  
//       // Spy on the sendMessage function
//       const sendMessageSpy = jest.fn().mockResolvedValue({
//         fromMe: true,
//         body: 'hello world',
//         type: 'chat',  // This should match the type of message you're expecting
//         to: '1',
//       });
  
//       clientMock.sendMessage = sendMessageSpy;
  
//       // Simulate the message event
//       await clientMock.on('message', async (msg) => {
//         console.log(`Message received on ${clientMock}:`, msg.body);
  
//         // Send a message in response
//         const sentMsg = await clientMock.sendMessage('1', 'hello world');
  
//         // Assertions
//         expect(sentMsg.type).to.equal('chat');  // Check if it's a text message
//         expect(sentMsg.fromMe).to.equal(true);  // Check if the message is sent by the bot
//         expect(sentMsg.body).to.equal('hello world');  // Verify message content
//         expect(sentMsg.to).to.equal('1');  // Verify recipient
//       });
  
//       // Simulate the event trigger by calling the message event handler
//       clientMock.on.mock.calls[0][1](message);
  
//       // Ensure sendMessage was called with the correct arguments
//       expect(sendMessageSpy).toHaveBeenCalledWith('1', 'hello world');
//     });
//   });


describe('WhatsApp Bot', () => {  

  it('should initialize a client',  () => {
    const clients = [];
    // Reset the clients array and inactiveChats set
    inactiveChats = new Set();

    initializeClient(1);
    expect(clients.length).toBe(1);
    expect(clients[0].authStrategy.clientId).toBe(clientName);
  });

});