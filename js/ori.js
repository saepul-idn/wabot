const { Client,LocalAuth  } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client({
     authStrategy: new LocalAuth({ clientId: "client-one" })
});
client.on('ready', () => {
    console.log('Client is ready!');
});
client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});
client.on('message', message => {
    //let gatau = client.sendMessage(message.from, 'maap ini bot jadi balas nya cepat banget');
	if(message.body === '!ping') {
		message.reply('pong');
	} 
    else if (message.body === 'hallo') {
		client.sendMessage(message.from, 'pong');
	}
    else if (message.body === 'asalamu alaikum')  {
		client.sendMessage(message.from, 'Wa alaikum salam');
	}

    console.log(message.body);
    //return gatau
});
 

client.initialize();
 