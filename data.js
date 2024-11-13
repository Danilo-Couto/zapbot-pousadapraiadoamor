const menu = 
'1. Preços e reservas \n' +
'2. Sobre a pousada \n' +
'3. Sobre os quartos \n' +
'4. Localização \n' +
'5. Horário de entrada e saída \n' +
'6. Café da manhã \n' +
'7. Formas de pagamento \n' +
'8. Redes Sociais \n' +
'9. Reservas para grupos \n' +
'10. Falar com o atendimento \n'+
'11. Confirmar reserva';

// Property details
const PROPERTY = {
    GENERAL: 'Somos uma pousada rústica e perto de tudo.\n\n' +
    'Estamos a 30 metros DA PRAIA DO AMOR e a 500 metros do CENTRO DE PIPA.\n\n' +
    'Temos PISCINA, ESTACIONAMENTO e COZINHA COMPARTILHADA.\n\n' +
    'Todos os quartos têm BANHEIRO privativo, AR-CONDICIONADO e alguns tem VARANDA com REDE.\n\n' +
    'Veja fotos neste link.\n' +
    'https://wa.me/p/5980292188676155/558481096734',
     
    BREAKFAST: 'Não temos café incluso, mas temos uma lanchonete ao lado com preços ótimos. O valor é cobrado de acordo com o consumo.',
    SCHEDULE: 'Check-in às 14h e check-out às 12h.',
    ROOMS: 'Todos os quartos têm BANHEIRO privativo, AR-CONDICIONADO, FRIGOBAR e alguns tem VARANDA com REDE.\n\n' +
    'Veja fotos neste link.\n' +
    'https://wa.me/c/558486250055',    
    INSTA: `Nosso instram é @pousada_praiadoamor_pipa`,    
    ADDRESS: `Rua Praia do Amor, 49, Pipa`,
    PAYMENTS: `Para reservar, pedimos 50% do total da estadia. O pagamento pode ser por PIX sem acréscimos ou no cartão com acréscimos de 4%.`,
    PET: 'Aceitamos pet mediante uma taxa de R$ 60.'
};

// Booking messages
const BOOKING_MESSAGES = {
    WANT_BOOK: `Gostou? Quer reservar?`,
    WANT_PRICES: `Por favor, nos diga a data e quantidade de pessoas`,
    PIX: `84 98625-0055 \n\nDanilo Luzzi do Couto \n\nApós realizar o Pix nos envie comprovante, nome completo e CPF`
};

// General messages
const MESSAGES = {
    GREETINGS: 'Olá e obrigado pelo contato. Para te atender mais rapidamente este atendimento começa automatizado.\n\n' +
    'Digite o número da opção desejada:\n\n' + menu + '\n\n' +
    'A qualquer momento digite Menu para voltar ao menu',
    WANT_PRICES: 'Por favor, nos diga a data e quantidade de pessoas e aguarde para ser atendido.',
};

module.exports = { MESSAGES, PROPERTY, BOOKING_MESSAGES };
