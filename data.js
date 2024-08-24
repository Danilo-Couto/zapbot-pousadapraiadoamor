const menu = 
'1. Preços e reservas \n' +
'2. Sobre a pousada \n' +
'3. Localização e endereço \n' +
'4. Sobre os quartos \n' +
'5. Horário de entrada e saída \n' +
'6. Saber sobre café da manhã \n' +
'7. Formas de pagamento \n' +
'8. Redes Sociais \n' +
'9. Reservas para grupos \n' +
'10. Falar com o atendimento \n';

// Property details
const PROPERTY = {
    GENERAL: `Temos 30 anos de história aqui em Pipa.\n
    Estamos a 30 metros DA PRAIA DO AMOR e a 500 metros do CENTRO DE PIPA.\n
    Temos PISCINA, ESTACIONAMENTO, COZINHA COMPARTILHADA e REDÁRIO.\n
    Todos os quartos têm BANHEIRO privativo, AR-CONDICIONADO, FRIGOBAR, VARANDA com REDE e alguns com TV e VISTA para o MAR.\n
    O café não está incluso, mas temos uma lanchonete com bons preços.\n
    Check-in às 14h e check-out às 12h.\n
    @pousada_praiadoamor_pipa.\n`,
    
    BREAKFAST: `Não temos café incluso, mas temos uma lanchonete ao lado com preços ótimos.\n`,
    SCHEDULE: `Check-in às 14h e check-out às 12h.\n`,
    ROOMS: 'Todos os quartos têm BANHEIRO privativo, AR-CONDICIONADO, FRIGOBAR, VARANDA com REDE e alguns com TV e VISTA para o MAR.\n\n' +
    'Dê uma olhada abrindo este link.\n' +
    'https://wa.me/c/558486250055 \n',    
    INSTA: `@pousada_praiadoamor_pipa \n`,    
    ADDRESS: `Rua Praia do Amor, 49, Pipa \n`,
    PAYMENTS: `Para reservar, pedimos 50% do total da estadia. O pagamento pode ser por PIX sem acréscimos ou no cartão com acréscimos de 4% \n`,
    PET: 'Aceitamos pet mediante uma taxa de R$ 60 \n'
};

// Booking messages
const BOOKING_MESSAGES = {
    WANT_BOOK: `Gostou? Quer reservar? \n`,
    WANT_PRICES: `Por favor, nos diga a data e quantidade de pessoas \n`,
    PIX: `84 98625-0055 \n\nDanilo Luzzi do Couto \n\nApós realizar o Pix nos envie comprovante, nome completo e CPF \n`
};

// General messages
const MESSAGES = {
    GREETINGS: 'Olá e obrigado pelo contato. Para te atender mais rapidamente, este atendimento começa automatizado.\n' +
    'Digite o número da opção desejada:\n' + menu,
    WANT_PRICES: 'Por favor, nos diga a data e quantidade de pessoas e aguarde para ser atendido \n',
};

module.exports = { MESSAGES, PROPERTY, BOOKING_MESSAGES };
