const { Client,LocalAuth  } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
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
    const jsonData = fs.readFileSync('./json/basic.json', 'utf8');
    const data = JSON.parse(jsonData);

    // Mengecek apakah message.body cocok dengan nilai dalam data.json
    for (const entry of data) {
        if (message.body === entry.value1) {
            client.sendMessage(message.from, entry.response);
            break; // Jika sudah ditemukan, hentikan pencarian
        }
        //
        const key = Object.keys(entry)[0]; // Mengambil nama properti pertama
        const value = entry[key];
        if (message.body === key) {
            client.sendMessage(message.from, value);
            break; // Jika sudah ditemukan, hentikan pencarian
        }
    }
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
 